package com.cankaratepe.ckconnect.route;

import java.util.List;

public interface RouteService {
    List<RouteDTO> findRoutes(Long originId, Long destinationId);
}
