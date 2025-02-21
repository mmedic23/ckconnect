package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;

import java.util.List;

public record TransportationDTO(
        Long id,
        LocationDTO origin,
        LocationDTO destination,
        TransportationType type,
        List<WeekDay> operatingDays
) {
    @Override
    public String toString() {
        return origin.toString() + "--[" + type.toString() + "]->" + destination.toString();
    }
}
