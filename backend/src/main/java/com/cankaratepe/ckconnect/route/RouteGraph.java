package com.cankaratepe.ckconnect.route;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.transportation.TransportationDTO;

import java.util.*;

public class RouteGraph {
    private final Map<LocationDTO, List<TransportationDTO>> outgoingTransports;

    public RouteGraph() {
        this.outgoingTransports = new HashMap<>();
    }

    public void addLocation(LocationDTO location) {
        outgoingTransports.putIfAbsent(location, new ArrayList<>());
    }

    public void addTransportation(TransportationDTO transportation) {
        LocationDTO origin = transportation.origin();
        addLocation(origin);
        outgoingTransports.get(origin).add(transportation);
    }

    public List<TransportationDTO> getOutgoingTransports(LocationDTO origin) {
        return outgoingTransports.getOrDefault(origin, Collections.emptyList());
    }
}
