package com.cankaratepe.ckconnect.route;

import java.time.LocalDateTime;
import java.util.List;

public interface RouteService {
    List<RouteDTO> findRoutes(Long originId, Long destinationId, LocalDateTime date);
}
