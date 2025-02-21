package com.cankaratepe.ckconnect.transportation;

import java.time.DayOfWeek;
import java.util.List;

public record CreateTransportationDTO(
        Long originLocationId,
        Long destinationLocationId,
        TransportationType type,
        List<DayOfWeek> operatingDays
) {
}
