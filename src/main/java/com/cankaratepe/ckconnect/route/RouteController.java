package com.cankaratepe.ckconnect.route;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/routes")
public class RouteController {
    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public ResponseEntity<FindRouteResponseDTO> findRoutes(@RequestParam Long originId, @RequestParam Long destinationId) {
        var routes = routeService.findRoutes(originId, destinationId);

        return ResponseEntity.ok(new FindRouteResponseDTO(routes.size(), routes));
    }
}
