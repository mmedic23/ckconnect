package com.cankaratepe.ckconnect.location;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    LocationDTO toDTO(LocationEntity locationEntity);

    LocationEntity toEntity(LocationDTO locationDTO);

    @Mapping(target = "id", ignore = true)
    LocationEntity toEntity(CreateLocationDTO locationDTO);

    @Mapping(target = "id", ignore = true)
    LocationEntity toEntity(UpdateLocationDTO locationDTO);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(UpdateLocationDTO locationDTO, @MappingTarget LocationEntity locationEntity);
}
