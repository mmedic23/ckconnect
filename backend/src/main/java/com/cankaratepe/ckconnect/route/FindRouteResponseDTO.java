package com.cankaratepe.ckconnect.route;

import java.util.List;

public record FindRouteResponseDTO(
        int numberOfRoutesFound,
        List<RouteDTO> routes
) {
}
