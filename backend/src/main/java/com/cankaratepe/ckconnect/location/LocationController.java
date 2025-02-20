package com.cankaratepe.ckconnect.location;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<LocationDTO>> get() {
        List<LocationDTO> locations = locationService.getAll();
        return ResponseEntity.ok(locations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDTO> get(@PathVariable Long id) {
        LocationDTO location = locationService.get(id);
        return ResponseEntity.ok(location);
    }

    @PostMapping
    public ResponseEntity<LocationDTO> create(@RequestBody CreateLocationDTO location) {
        LocationDTO createdLocation = locationService.create(location);
        return ResponseEntity.created(URI.create("/api/v1/locations/" + createdLocation.id()))
                .body(createdLocation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationDTO> update(@PathVariable Long id, @RequestBody UpdateLocationDTO location) {
        LocationDTO updatedLocation = locationService.update(id, location);
        return ResponseEntity.ok(updatedLocation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean isDeletedSuccessfully = locationService.delete(id);
        if (isDeletedSuccessfully) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
