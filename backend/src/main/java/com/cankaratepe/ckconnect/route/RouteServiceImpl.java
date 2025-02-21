package com.cankaratepe.ckconnect.route;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.location.LocationService;
import com.cankaratepe.ckconnect.transportation.TransportationDTO;
import com.cankaratepe.ckconnect.transportation.TransportationService;
import com.cankaratepe.ckconnect.transportation.TransportationType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
import java.util.stream.Collectors;

@Service
public class RouteServiceImpl implements RouteService {
    final Logger logger = LoggerFactory.getLogger(RouteServiceImpl.class);

    private final LocationService locationService;
    private final TransportationService transportationService;

    public RouteServiceImpl(LocationService locationService, TransportationService transportationService) {
        this.locationService = locationService;
        this.transportationService = transportationService;
    }

    @Override
    public List<RouteDTO> findRoutes(Long originId, Long destinationId, LocalDateTime date) {
        LocationDTO origin = locationService.get(originId);
        LocationDTO destination = locationService.get(destinationId);
        return enumerateRoutes(origin, destination, date.getDayOfWeek());
    }

    private List<RouteDTO> enumerateRoutes(LocationDTO origin, LocationDTO destination, DayOfWeek dayOfWeek) {
        logger.trace("Enumerating routes from {} to {}", origin, destination);
        List<RouteDTO> routes = new ArrayList<>();

        RouteGraph routeGraph = new RouteGraph();
        List<TransportationDTO> allTransportations = transportationService.getAll();
        for (TransportationDTO transportationDTO : allTransportations) {
            routeGraph.addTransportation(transportationDTO);
        }

        // dfs(origin, destination, routeGraph, new ArrayList<>(), routes);

        searchRoutes(origin, destination, routeGraph, routes);
        return routes;
    }

    private void searchRoutes(LocationDTO origin, LocationDTO destination, RouteGraph routeGraph, List<RouteDTO> routes) {
        Stack<RouteState> stack = new Stack<>();

        List<TransportationDTO> outgoing = routeGraph.getOutgoingTransports(origin);
        stack.push(new RouteState(origin, new ArrayList<>(), outgoing.iterator()));

        while (!stack.isEmpty()) {
            RouteState currentState = stack.peek();

            if (!currentState.outgoingTransports().hasNext()) {
                stack.pop();
                continue;
            }

            TransportationDTO nextOutgoing = currentState.outgoingTransports().next();

            List<TransportationDTO> newPath = new ArrayList<>(currentState.currentPath());
            newPath.add(nextOutgoing);

            LocationDTO newLocation = nextOutgoing.destination();
            if (newLocation.equals(destination)) {
                if (isValidPath(newPath)) {
                    routes.add(new RouteDTO(routes.size() + 1, newPath.size(), newPath));
                }
                continue;
            }

            if (newPath.size() < 3) {
                stack.push(new RouteState(
                        newLocation,
                        newPath,
                        routeGraph.getOutgoingTransports(newLocation).iterator()
                ));
            }
        }
    }

    /**
     * Find all valid routes between current and destination using Depth-First Search
     * @deprecated Please use the iterative version {@link RouteServiceImpl#searchRoutes} instead.
     */
    @Deprecated
    private void dfs(LocationDTO current, LocationDTO destination, RouteGraph routeGraph, List<TransportationDTO> currentPath, List<RouteDTO> routesToDestination) {
        logger.trace("DFS called with Current: {} Destination: {}", current, destination);
        logger.trace("Current path: {}", currentPath.stream().map(TransportationDTO::toString).collect(Collectors.joining(", ")));
        if (currentPath.size() > 3) {
            return;
        }

        if (current.locationCode().equals(destination.locationCode())) {
            logger.trace("Current matches destination");
        }

        if (current.equals(destination)) {
            if (isValidPath(currentPath)) {
                routesToDestination.add(new RouteDTO(routesToDestination.size() + 1, currentPath.size(), new ArrayList<>(currentPath)));
                return;
            }
        }

        List<TransportationDTO> outgoingTransports = routeGraph.getOutgoingTransports(current);
        logger.trace("Outgoing transports: {}", outgoingTransports.stream().map(TransportationDTO::toString).collect(Collectors.joining(", ")));
        logger.trace("Number of outgoing transports for {} is: {}", current, outgoingTransports.size());

        for (TransportationDTO outgoingTransportation : outgoingTransports) {
            // TODO Maybe don't add the outgoing path if it would validate the rules? If implemented, would this remove the need for the isValidPath check?
            logger.trace("Evaluating transportation: {}", outgoingTransportation);
            currentPath.add(outgoingTransportation);
            dfs(outgoingTransportation.destination(), destination, routeGraph, currentPath, routesToDestination);
            currentPath.removeLast();
        }
    }

    private boolean isValidPath(List<TransportationDTO> path) {
        // Path cannot be empty or longer than 3
        if (path.isEmpty() || path.size() > 3) {
            return false;
        }

        // There must be 1 and only 1 flight
        long flightCount = path.stream()
                .filter(t -> t.type() == TransportationType.FLIGHT)
                .count();
        if (flightCount != 1) {
            return false;
        }

        // Path must be connected
        for (int i = 0; i < path.size() - 1; i++) {
            if (!path.get(i).destination().equals(path.get(i + 1).origin())) {
                return false;
            }
        }

        return true;
    }
}
