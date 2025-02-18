package com.cankaratepe.ckconnect.transportation;

public record CreateTransportationDTO(
        Long originLocationId,
        Long destinationLocationId,
        TransportationType type
) {
}
