package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationDTO;
import com.cankaratepe.ckconnect.location.LocationEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

// TODO These mapper classes can be generic maybe?
@Mapper(componentModel = "spring")
public interface TransportationMapper {

    @Mapping(target = "origin", source = "originLocation")
    @Mapping(target = "destination", source = "destinationLocation")
    @Mapping(target = "type", source = "transportationType")
    @Mapping(target = "operatingDays", source = "operatingDays")
    TransportationDTO toDTO(TransportationEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "originLocation", source = "origin")
    @Mapping(target = "destinationLocation", source = "destination")
    @Mapping(target = "transportationType", source = "type")
    @Mapping(target = "operatingDays", source = "operatingDays")
    TransportationEntity toEntity(TransportationDTO dto);


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transportationType", source = "dto.type")
    @Mapping(target = "operatingDays", source = "dto.operatingDays")
    TransportationEntity toEntity(CreateTransportationDTO dto, LocationEntity originLocation, LocationEntity destinationLocation);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transportationType", source = "dto.type")
    @Mapping(target = "operatingDays", source = "dto.operatingDays")
    void updateEntityFromDto(UpdateTransportationDTO dto, LocationEntity originLocation, LocationEntity destinationLocation, @MappingTarget TransportationEntity entity);
}
