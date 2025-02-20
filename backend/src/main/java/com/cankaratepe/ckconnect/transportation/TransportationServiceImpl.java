package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.location.LocationEntity;
import com.cankaratepe.ckconnect.location.LocationRepository;
import com.cankaratepe.ckconnect.location.LocationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationServiceImpl implements TransportationService {
    private final TransportationRepository transportationRepository;
    private final TransportationMapper transportationMapper;
    private final LocationRepository locationRepository;

    public TransportationServiceImpl(TransportationRepository transportationRepository, TransportationMapper transportationMapper, LocationRepository locationRepository) {
        this.transportationRepository = transportationRepository;
        this.transportationMapper = transportationMapper;
        this.locationRepository = locationRepository;
    }

    @Override
    public TransportationDTO get(Long id) {
        return transportationRepository.findById(id)
                .map(transportationMapper::toDTO)
                .orElseThrow(() -> new EntityNotFoundException("Transportation not found with ID: " + id));
    }

    @Override
    public List<TransportationDTO> getAll() {
        return transportationRepository.findAll().stream().map(transportationMapper::toDTO).toList();
    }

    @Override
    public TransportationDTO create(CreateTransportationDTO transportationDTO) {
        LocationEntity newOrigin = locationRepository.findById(transportationDTO.originLocationId()).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + transportationDTO.originLocationId()));
        LocationEntity newDestination = locationRepository.findById(transportationDTO.destinationLocationId()).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + transportationDTO.destinationLocationId()));

        TransportationEntity newTransportation = transportationMapper.toEntity(transportationDTO, newOrigin, newDestination);
        TransportationEntity savedTransportation = transportationRepository.save(newTransportation);
        return transportationMapper.toDTO(savedTransportation);
    }

    @Override
    public TransportationDTO update(Long id, UpdateTransportationDTO transportationDTO) {
        Optional<TransportationEntity> existingEntity = transportationRepository.findById(id);

        LocationEntity newOrigin = locationRepository.findById(transportationDTO.originLocationId()).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + transportationDTO.originLocationId()));
        LocationEntity newDestination = locationRepository.findById(transportationDTO.destinationLocationId()).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + transportationDTO.destinationLocationId()));

        return existingEntity
                .map(entity -> {
                    transportationMapper.updateEntityFromDto(transportationDTO, newOrigin, newDestination, entity);
                    TransportationEntity updatedEntity = transportationRepository.save(entity);
                    return transportationMapper.toDTO(updatedEntity);
                })
                .orElseThrow(() -> new EntityNotFoundException("Transportation not found with ID: " + id));
    }

    @Override
    public boolean delete(Long id) {
        if (transportationRepository.existsById(id)) {
            transportationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
