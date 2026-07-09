import { flightDestinationCatalog } from '../../../assets/flightDestinationsAfriqueAntilles';

export type TicketAirport = {
  city: string;
  code: string;
  name: string;
};

export const ticketAirports: TicketAirport[] = [
  ...flightDestinationCatalog.popularEuropeanGatewayAirports.flatMap(
    (gateway) =>
      gateway.airports.map((airport) => ({
        city: airport.city,
        code: airport.iata,
        name: airport.name,
      }))
  ),
  ...[
    ...flightDestinationCatalog.destinations.africa,
    ...flightDestinationCatalog.destinations.antilles,
  ].flatMap((destination) =>
    destination.airports.map((airport) => ({
      city: airport.city,
      code: airport.iata,
      name: airport.name,
    }))
  ),
];

export const findTicketAirportByCode = (code?: string) => {
  if (!code) {
    return undefined;
  }

  return ticketAirports.find(
    (airport) => airport.code.toUpperCase() === code.toUpperCase()
  );
};

export const knownAirportCodesPattern = ticketAirports
  .map((airport) => airport.code)
  .join('|');
