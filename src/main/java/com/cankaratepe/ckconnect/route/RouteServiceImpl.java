package com.cankaratepe.ckconnect.route;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.location.LocationService;
import com.cankaratepe.ckconnect.transportation.TransportationDTO;
import com.cankaratepe.ckconnect.transportation.TransportationService;
import com.cankaratepe.ckconnect.transportation.TransportationType;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
    public List<RouteDTO> findRoutes(Long originId, Long destinationId) {
        LocationDTO origin = getLocationById(originId);
        LocationDTO destination = getLocationById(destinationId);
        return enumerateRoutes(origin, destination);
    }

    // TODO Maybe handle the exception
    private LocationDTO getLocationById(Long id) {
        return locationService.get(id).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + id));
    }

    private List<RouteDTO> enumerateRoutes(LocationDTO origin, LocationDTO destination) {
        logger.trace("Enumerating routes from {} to {}", origin, destination);
        List<RouteDTO> routes = new ArrayList<>();

        RouteGraph routeGraph = new RouteGraph();
        List<TransportationDTO> allTransportations = transportationService.getAll();
        for (TransportationDTO transportationDTO : allTransportations) {
            routeGraph.addTransportation(transportationDTO);
        }

        dfs(origin, destination, routeGraph, new ArrayList<>(), routes);
        return routes;
    }

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
                routesToDestination.add(new RouteDTO(routesToDestination.size(), currentPath.size(), new ArrayList<>(currentPath)));
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
