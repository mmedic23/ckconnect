package com.cankaratepe.ckconnect.transportation;

import com.cankaratepe.ckconnect.location.LocationEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "transportation")
public class TransportationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(nullable = false)
    private LocationEntity originLocation;
    @ManyToOne
    @JoinColumn(nullable = false)
    private LocationEntity destinationLocation;
    private TransportationType transportationType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocationEntity getOriginLocation() {
        return originLocation;
    }

    public void setOriginLocation(LocationEntity originLocation) {
        this.originLocation = originLocation;
    }

    public LocationEntity getDestinationLocation() {
        return destinationLocation;
    }

    public void setDestinationLocation(LocationEntity destinationLocation) {
        this.destinationLocation = destinationLocation;
    }

    public TransportationType getTransportationType() {
        return transportationType;
    }

    public void setTransportationType(TransportationType transportationType) {
        this.transportationType = transportationType;
    }
}
