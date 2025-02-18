package com.cankaratepe.ckconnect.transportation;

public record UpdateTransportationDTO(
        Long originLocationId,
        Long destinationLocationId,
        TransportationType type
) {
}
