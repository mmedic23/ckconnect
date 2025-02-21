package com.cankaratepe.ckconnect.transportation;

import java.util.List;

public record UpdateTransportationDTO(
        Long originLocationId,
        Long destinationLocationId,
        TransportationType type,
        List<WeekDay> operatingDays
) {
}
