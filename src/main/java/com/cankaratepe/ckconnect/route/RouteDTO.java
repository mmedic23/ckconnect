package com.cankaratepe.ckconnect.route;

import com.cankaratepe.ckconnect.transportation.TransportationDTO;

import java.util.List;

public record RouteDTO(
        int order,
        int numberOfLegs,
        List<TransportationDTO> legs
) {
}
