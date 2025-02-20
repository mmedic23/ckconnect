package com.cankaratepe.ckconnect.transportation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/transportations")
public class TransportationController {
    private final TransportationService transportationService;

    public TransportationController(TransportationService transportationService) {
        this.transportationService = transportationService;
    }

    @GetMapping
    public ResponseEntity<List<TransportationDTO>> get() {
        List<TransportationDTO> transportations = transportationService.getAll();
        return ResponseEntity.ok(transportations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportationDTO> get(@PathVariable Long id) {
        TransportationDTO transportation = transportationService.get(id);
        return ResponseEntity.ok(transportation);
    }

    @PostMapping
    public ResponseEntity<TransportationDTO> create(@RequestBody CreateTransportationDTO transportation) {
        TransportationDTO createdTransportation = transportationService.create(transportation);
        return ResponseEntity.created(URI.create("/api/v1/transportations/" + createdTransportation.id()))
                .body(createdTransportation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransportationDTO> update(@PathVariable Long id, @RequestBody UpdateTransportationDTO transportation) {
        TransportationDTO updatedTransportation = transportationService.update(id, transportation);
        return ResponseEntity.ok(updatedTransportation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        boolean isDeletedSuccessfully = transportationService.delete(id);
        if (isDeletedSuccessfully) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
