package com.cankaratepe.ckconnect.location;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public LocationServiceImpl(LocationRepository locationRepository, LocationMapper locationMapper) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
    }

    @Override
    public Optional<LocationDTO> get(Long id) {
        Optional<LocationEntity> foundEntity = locationRepository.findById(id);
        return foundEntity.map(locationMapper::toDTO);
    }

    @Override
    public List<LocationDTO> getAll() {
        return locationRepository.findAll().stream().map(locationMapper::toDTO).toList();
    }

    @Override
    public LocationDTO create(CreateLocationDTO locationDTO) {
        LocationEntity newLocation = locationMapper.toEntity(locationDTO);
        newLocation.setId(null);
        LocationEntity savedLocation = locationRepository.save(newLocation);
        return locationMapper.toDTO(savedLocation);
    }

    @Override
    public Optional<LocationDTO> update(Long id, UpdateLocationDTO locationDTO) {
        Optional<LocationEntity> existingEntity = locationRepository.findById(id);
        return existingEntity.map(entity -> {
            locationMapper.updateEntityFromDto(locationDTO, entity);
            LocationEntity updatedEntity = locationRepository.save(entity);
            return locationMapper.toDTO(updatedEntity);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
