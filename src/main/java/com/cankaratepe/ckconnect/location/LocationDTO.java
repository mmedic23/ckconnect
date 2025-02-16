package com.cankaratepe.ckconnect.location;

public record LocationDTO(
        Long id,
        String name,
        String country,
        String city,
        String locationCode
) {
    @Override
    public String toString() {
        return locationCode();
    }
}
