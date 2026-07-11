import type { FlightTicketData } from '../types/FlightTicketData';
import {
  findTicketAirportByCode,
  knownAirportCodesPattern,
} from './airportLookup';

export const parseBoardingPassBarcode = (
  raw: string,
): Partial<FlightTicketData> => {
  const structuredPayload = parseStructuredTicketPayload(raw);

  if (structuredPayload) {
    return structuredPayload;
  }

  const keyValuePayload = parseKeyValueTicketPayload(raw);

  if (keyValuePayload) {
    return keyValuePayload;
  }

  const normalized = normalizeTicketText(raw);
  const airportCodes = extractKnownAirportCodes(normalized);
  const departureAirportCode = airportCodes[0];
  const arrivalAirportCode = airportCodes[1];

  return withAirportNames({
    passengerName: extractPassengerNameFromBcbp(normalized),
    departureAirportCode,
    arrivalAirportCode,
    flightNumber: find(normalized, /\b([A-Z0-9]{2}\s?\d{2,4})\b/),
  });
};

export const parseTicketText = (raw: string): Partial<FlightTicketData> => {
  const text = normalizeTicketText(raw);
  const airportCodes = extractKnownAirportCodes(text);
  const departureAirportCode =
    find(
      text,
      new RegExp(
        `\\b(?:DE|FROM)\\s*[:=.-]?\\s*(${knownAirportCodesPattern})\\b`,
      ),
    ) ?? airportCodes[0];
  const arrivalAirportCode =
    find(
      text,
      new RegExp(
        `\\b(?:VERS|TO)\\s*[:=.-]?\\s*(${knownAirportCodesPattern})\\b`,
      ),
    ) ?? airportCodes.find((code) => code !== departureAirportCode);
  const departureTime = findFirst(text, [
    /\bHEURE\s+(?:DE\s+)?DEPART\s*(\d{1,2}(?::|H)?\d{2})\b/,
    /\b(?:DEPART|DEP|STD)\s*[:=.-]?\s*(\d{1,2}(?::|H)?\d{2})\b/,
  ]);
  const arrivalTime = findFirst(text, [
    /\bHEURE\s+(?:D['’]?\s*)?ARRIVEE\s*(\d{1,2}(?::|H)?\d{2})\b/,
    /\b(?:ARRIVEE|ARR|STA)\s*[:=.-]?\s*(\d{1,2}(?::|H)?\d{2})\b/,
  ]);
  const departureDate = findFirst(text, [
    /\bDATE\s+(?:DE\s+)?DEPART\s*(\d{8}|\d{4}-\d{2}-\d{2}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})\b/,
    /\b(?:DATE|LE)\s*[:=.-]?\s*(\d{8}|\d{4}-\d{2}-\d{2}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})\b/,
  ]);
  const arrivalDate = findFirst(text, [
    /\bDATE\s+(?:D['’]?\s*)?ARRIVEE\s*(\d{8}|\d{4}-\d{2}-\d{2}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})\b/,
    /\bARRIVEE\s*(\d{8}|\d{4}-\d{2}-\d{2}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})\b/,
  ]);
  const visibleDates = extractVisibleDates(text);
  const visibleTimes = extractVisibleTimes(text);
  const flightDate = departureDate ?? visibleDates[0];
  const flightArrivalDate = arrivalDate ?? visibleDates[1] ?? flightDate;
  const flightDepartureTime = departureTime ?? visibleTimes[0];
  const flightArrivalTime =
    arrivalTime ??
    visibleTimes.find(
      (time, index) => index > 0 && time !== flightDepartureTime,
    );
  const boardingTime = normalizeTime(
    find(
      text,
      /\b(?:EMBARQUEMENT|BOARDING|BDG)\s*[:=.-]?\s*(\d{1,2}(?::|H)?\d{2})\b/,
    ) ?? visibleTimes[2],
  );

  return withAirportNames({
    passengerName: find(
      text,
      /\b(?:PASSAGER|PASSENGER|PAX)\s+([A-ZÀ-Ÿ\s/-]{2,40})/,
    ),
    departureAirportCode,
    arrivalAirportCode,
    flightNumber: find(
      text,
      /\b(?:VOL|FLIGHT)\s*[:.-]?\s*([A-Z0-9]{2}\s?\d{2,4})\b/,
    ),
    departureDate: flightDate,
    departureTime: normalizeTime(flightDepartureTime),
    boardingTime,
    flightDepartureAt: toDatetimeLocal(flightDate, flightDepartureTime),
    flightArrivalAt: toDatetimeLocal(flightArrivalDate, flightArrivalTime),
    gate: find(text, /\b(?:PORTE|GATE)\s*[:.-]?\s*([A-Z0-9]{1,4})\b/),
    seat: find(text, /\b(?:SIEGE|SIÈGE|SEAT)\s*[:.-]?\s*([0-9]{1,2}[A-F])\b/),
    bookingReference: find(
      text,
      /\b(?:RESERVATION|RÉSERVATION|PNR|BOOKING)\s*[:.-]?\s*([A-Z0-9]{5,8})\b/,
    ),
  });
};

const parseStructuredTicketPayload = (
  raw: string,
): Partial<FlightTicketData> | null => {
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const payload =
      isRecord(parsed.qr_code_payload) || isRecord(parsed.ticket)
        ? ((parsed.qr_code_payload ?? parsed.ticket) as Record<string, unknown>)
        : parsed;

    const departureDate = getString(payload, 'departureDate');
    const departureTime = getString(payload, 'departureTime');
    const arrivalTime = getString(payload, 'arrivalTime');

    return withAirportNames({
      passengerName: getString(payload, 'passengerName'),
      departureAirportCode: getString(payload, 'departureAirportCode'),
      departureAirportName: getString(payload, 'departureAirportName'),
      arrivalAirportCode: getString(payload, 'arrivalAirportCode'),
      arrivalAirportName: getString(payload, 'arrivalAirportName'),
      flightNumber: getString(payload, 'flightNumber'),
      departureDate,
      departureTime: normalizeTime(departureTime),
      boardingTime: normalizeTime(getString(payload, 'boardingTime')),
      flightDepartureAt: toDatetimeLocal(departureDate, departureTime),
      flightArrivalAt: toDatetimeLocal(departureDate, arrivalTime),
      gate: getString(payload, 'gate'),
      seat: getString(payload, 'seat'),
      bookingReference: getString(payload, 'bookingReference'),
    });
  } catch {
    return null;
  }
};

const parseKeyValueTicketPayload = (
  raw: string,
): Partial<FlightTicketData> | null => {
  const values = raw
    .split('|')
    .map((part) => part.trim())
    .reduce<Record<string, string>>((payload, part) => {
      const [key, ...rest] = part.split('=');

      if (!key || rest.length === 0) {
        return payload;
      }

      return {
        ...payload,
        [normalizeValueKey(key)]: rest.join('=').trim(),
      };
    }, {});

  if (Object.keys(values).length === 0) {
    return null;
  }

  const departureDate = values.DATE;
  const departureTime = values.DEP ?? values.STD;
  const arrivalTime = values.ARR ?? values.STA;

  return withAirportNames({
    passengerName: values.PAX,
    departureAirportCode: values.FROM,
    arrivalAirportCode: values.TO,
    flightNumber: values.FLT ?? values.FLIGHT,
    departureDate,
    departureTime: normalizeTime(departureTime),
    boardingTime: normalizeTime(values.BDG ?? values.BOARDING),
    flightDepartureAt: toDatetimeLocal(departureDate, departureTime),
    flightArrivalAt: toDatetimeLocal(departureDate, arrivalTime),
    gate: values.GATE,
    seat: values.SEAT,
    bookingReference: values.REF ?? values.PNR,
  });
};

const withAirportNames = (
  data: Partial<FlightTicketData>,
): Partial<FlightTicketData> => {
  const departureAirport = findTicketAirportByCode(data.departureAirportCode);
  const arrivalAirport = findTicketAirportByCode(data.arrivalAirportCode);

  return {
    ...data,
    departureAirportName: departureAirport?.name,
    arrivalAirportName: arrivalAirport?.name,
  };
};

const extractPassengerNameFromBcbp = (raw: string) => {
  const match = raw.match(/^M\d([A-Z0-9/ ]{2,40})/);

  return match?.[1]?.replace(/\//g, ' ').trim();
};

const extractKnownAirportCodes = (text: string) => {
  const regex = new RegExp(`\\b(${knownAirportCodesPattern})\\b`, 'g');
  const matches = text.match(regex) ?? [];

  return [...new Set(matches)];
};

const extractVisibleDates = (text: string) => {
  const matches = text.match(
    /\b(\d{8}|\d{4}-\d{2}-\d{2}|\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4})\b/g,
  );

  return matches ?? [];
};

const extractVisibleTimes = (text: string) => {
  const matches = text.match(/\b\d{1,2}[:H]\d{2}\b/g);

  return matches ?? [];
};

const normalizeTicketText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[|]/g, 'I')
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();

const normalizeTime = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().replace('H', ':');

  if (/^\d{3,4}$/.test(normalized)) {
    return `${normalized.slice(0, -2).padStart(2, '0')}:${normalized.slice(-2)}`;
  }

  const timeParts = normalized.match(/^(\d{1,2}):(\d{2})$/);

  if (!timeParts) {
    return undefined;
  }

  return `${timeParts[1].padStart(2, '0')}:${timeParts[2]}`;
};

const find = (text: string, regex: RegExp) => text.match(regex)?.[1]?.trim();

const findFirst = (text: string, regexes: RegExp[]) => {
  for (const regex of regexes) {
    const value = find(text, regex);

    if (value) {
      return value;
    }
  }

  return undefined;
};

const toDatetimeLocal = (rawDate?: string, rawTime?: string) => {
  const time = normalizeTime(rawTime);

  if (!rawDate || !time) {
    return undefined;
  }

  const compactDate = rawDate.match(/^(\d{4})(\d{2})(\d{2})$/);

  if (compactDate) {
    return `${compactDate[1]}-${compactDate[2]}-${compactDate[3]}T${time}`;
  }

  const isoDate = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDate) {
    return `${isoDate[1]}-${isoDate[2]}-${isoDate[3]}T${time}`;
  }

  const dateParts = rawDate.match(/(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/);

  if (!dateParts) {
    return undefined;
  }

  const day = dateParts[1].padStart(2, '0');
  const month = dateParts[2].padStart(2, '0');
  const year = dateParts[3].length === 2 ? `20${dateParts[3]}` : dateParts[3];

  return `${year}-${month}-${day}T${time}`;
};

const getString = (payload: Record<string, unknown>, key: string) => {
  const value = payload[key];

  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const normalizeValueKey = (value: string) =>
  normalizeTicketText(value).replace(/[^A-Z0-9]/g, '');
