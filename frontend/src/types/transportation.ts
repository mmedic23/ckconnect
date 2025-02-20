import { LocationDto } from './location';

export interface RichTransportationDto {
  id: number;
  origin: LocationDto;
  destination: LocationDto;
  type: 'FLIGHT' | 'BUS' | 'SUBWAY' | 'UBER';
}

export interface TransportationDto {
  id: number;
  originLocationId: number;
  destinationLocationId: number;
  type: 'FLIGHT' | 'BUS' | 'SUBWAY' | 'UBER';
}
