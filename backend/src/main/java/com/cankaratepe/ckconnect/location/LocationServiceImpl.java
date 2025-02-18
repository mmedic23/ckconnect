package com.cankaratepe.ckconnect.location;

import jakarta.persistence.EntityNotFoundException;
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
    public LocationDTO get(Long id) {
        return locationRepository.findById(id)
                .map(locationMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    @Override
    public List<LocationDTO> getAll() {
        return locationRepository.findAll().stream().map(locationMapper::toDTO).toList();
    }

    @Override
    public LocationDTO create(CreateLocationDTO locationDTO) {
        LocationEntity newLocation = locationMapper.toEntity(locationDTO);
        LocationEntity savedLocation = locationRepository.save(newLocation);
        return locationMapper.toDTO(savedLocation);
    }

    @Override
    public LocationDTO update(Long id, UpdateLocationDTO locationDTO) {
        Optional<LocationEntity> existingEntity = locationRepository.findById(id);
        return existingEntity
                .map(entity -> {
                    locationMapper.updateEntityFromDto(locationDTO, entity);
                    LocationEntity updatedEntity = locationRepository.save(entity);
                    return locationMapper.toDTO(updatedEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
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
