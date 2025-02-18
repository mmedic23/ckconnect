package com.cankaratepe.ckconnect.location;

public record CreateLocationDTO(
        String name,
        String country,
        String city,
        String locationCode
) {
}
