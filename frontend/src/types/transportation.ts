import { LocationDto } from './location';

export interface RichTransportationDto {
  id: number;
  origin: LocationDto;
  destination: LocationDto;
  type: 'FLIGHT' | 'BUS' | 'SUBWAY' | 'UBER';
  operatingDays: WeekDay[];
}

export interface TransportationDto {
  id: number;
  originLocationId: number;
  destinationLocationId: number;
  type: 'FLIGHT' | 'BUS' | 'SUBWAY' | 'UBER';
  operatingDays: WeekDay[];
}

export type TransportationType = 'FLIGHT' | 'BUS' | 'SUBWAY' | 'UBER';
export type WeekDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
