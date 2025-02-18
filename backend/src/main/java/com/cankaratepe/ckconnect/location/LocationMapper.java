package com.cankaratepe.ckconnect.location;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    LocationDTO toDTO(LocationEntity entity);

    LocationEntity toEntity(LocationDTO dto);

    @Mapping(target = "id", ignore = true)
    LocationEntity toEntity(CreateLocationDTO dto);

    @Mapping(target = "id", ignore = true)
    LocationEntity toEntity(UpdateLocationDTO dto);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(UpdateLocationDTO dto, @MappingTarget LocationEntity entity);
}
