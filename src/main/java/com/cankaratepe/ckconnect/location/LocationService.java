package com.cankaratepe.ckconnect.location;

import java.util.List;
import java.util.Optional;

public interface LocationService {
    Optional<LocationDTO> get(Long id);

    List<LocationDTO> getAll();

    LocationDTO create(CreateLocationDTO location);

    Optional<LocationDTO> update(Long id, UpdateLocationDTO location);

    boolean delete(Long id);
}
