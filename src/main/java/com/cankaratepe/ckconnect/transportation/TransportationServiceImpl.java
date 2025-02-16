package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.location.LocationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransportationServiceImpl implements TransportationService {
    private final TransportationRepository transportationRepository;
    private final TransportationMapper transportationMapper;
    private final LocationService locationService;

    public TransportationServiceImpl(TransportationRepository transportationRepository, TransportationMapper transportationMapper, LocationService locationService) {
        this.transportationRepository = transportationRepository;
        this.transportationMapper = transportationMapper;
        this.locationService = locationService;
    }

    @Override
    public Optional<TransportationDTO> get(Long id) {
        return transportationRepository.findById(id).map(transportationMapper::toDTO);
    }

    @Override
    public List<TransportationDTO> getAll() {
        return transportationRepository.findAll().stream().map(transportationMapper::toDTO).toList();
    }

    // TODO Why can't create return Optional?
    @Override
    public TransportationDTO create(CreateTransportationDTO transportationDTO) {
        LocationDTO originLocation = getLocationById(transportationDTO.originLocationId());
        LocationDTO destinationLocation = getLocationById(transportationDTO.destinationLocationId());

        TransportationEntity newTransportation = transportationMapper.toEntity(transportationDTO, originLocation, destinationLocation);
        TransportationEntity savedTransportation = transportationRepository.save(newTransportation);
        return transportationMapper.toDTO(savedTransportation);
    }

    @Override
    public Optional<TransportationDTO> update(Long id, UpdateTransportationDTO transportationDTO) {
        Optional<TransportationEntity> existingEntity = transportationRepository.findById(id);
        LocationDTO newOriginLocation = getLocationById(transportationDTO.originLocationId());
        LocationDTO newDestinationLocation = getLocationById(transportationDTO.destinationLocationId());

        return existingEntity.map(entity -> {
            transportationMapper.updateEntityFromDto(transportationDTO, newOriginLocation, newDestinationLocation, entity);
            TransportationEntity updatedEntity = transportationRepository.save(entity);
            return transportationMapper.toDTO(updatedEntity);
        });
    }

    @Override
    public boolean delete(Long id) {
        if (transportationRepository.existsById(id)) {
            transportationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // TODO Maybe handle the exception
    private LocationDTO getLocationById(Long id) {
        return locationService.get(id).orElseThrow(() -> new EntityNotFoundException("Location not found with ID: " + id));
    }
}
