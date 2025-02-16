package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;

public record TransportationDTO(
        Long id,
        LocationDTO origin,
        LocationDTO destination,
        TransportationType type
) {
    @Override
    public String toString() {
        return origin.toString() + "--[" + type.toString() + "]->" + destination.toString();
    }
}
