package com.cankaratepe.ckconnect.transportation;

import java.util.List;

public interface TransportationService {
    TransportationDTO get(Long id);

    List<TransportationDTO> getAll();

    TransportationDTO create(CreateTransportationDTO location);

    TransportationDTO update(Long id, UpdateTransportationDTO location);

    boolean delete(Long id);
}
