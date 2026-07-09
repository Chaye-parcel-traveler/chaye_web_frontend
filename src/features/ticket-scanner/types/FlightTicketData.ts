export type FlightTicketData = {
  arrivalAirportCode?: string;
  arrivalAirportName?: string;
  boardingTime?: string;
  bookingReference?: string;
  confidence?: number;
  departureAirportCode?: string;
  departureAirportName?: string;
  departureDate?: string;
  departureTime?: string;
  flightArrivalAt?: string;
  flightDepartureAt?: string;
  flightNumber?: string;
  gate?: string;
  passengerName?: string;
  rawText?: string;
  seat?: string;
  source: 'barcode' | 'manual' | 'ocr';
};
