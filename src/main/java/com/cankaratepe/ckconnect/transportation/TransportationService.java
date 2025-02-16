package com.cankaratepe.ckconnect.transportation;

import java.util.List;
import java.util.Optional;

public interface TransportationService {
    Optional<TransportationDTO> get(Long id);

    List<TransportationDTO> getAll();

    TransportationDTO create(CreateTransportationDTO location);

    Optional<TransportationDTO> update(Long id, UpdateTransportationDTO location);

    boolean delete(Long id);
}
