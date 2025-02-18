package com.cankaratepe.ckconnect.route;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.transportation.TransportationDTO;

import java.util.Iterator;
import java.util.List;

public record RouteState(
        LocationDTO currentLocation,
        List<TransportationDTO> currentPath,
        Iterator<TransportationDTO> outgoingTransports
) {
}
