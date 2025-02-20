import { RichTransportationDto } from "./transportation";

export interface RouteDto {
    order: number,
    numberOfLegs: number,
    legs: RichTransportationDto[]
}

export interface FindRouteResponse {
    numberOfRoutesFound: number,
    routes: RouteDto[]
}