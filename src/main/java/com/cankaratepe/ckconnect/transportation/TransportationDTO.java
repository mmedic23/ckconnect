package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;

public record TransportationDTO(
        Long id,
        LocationDTO origin,
        LocationDTO destination,
        TransportationType type
) {
}
