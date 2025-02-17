package com.cankaratepe.ckconnect.location;

import java.util.List;

public interface LocationService {
    LocationDTO get(Long id);

    List<LocationDTO> getAll();

    LocationDTO create(CreateLocationDTO location);

    LocationDTO update(Long id, UpdateLocationDTO location);

    boolean delete(Long id);
}
