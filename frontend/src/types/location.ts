export interface LocationDto {
  id: number;
  name: string;
  country: string;
  city: string;
  locationCode: string;
}

export type LocationsMap = { [id: number]: LocationDto };
