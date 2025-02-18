package com.cankaratepe.ckconnect.location;

public record UpdateLocationDTO(
        String name,
        String country,
        String city,
        String locationCode
) {
}
