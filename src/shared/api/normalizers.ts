export type LooseRecord = Record<string, unknown>;

export const isRecord = (value: unknown): value is LooseRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

export const getValue = (value: unknown, key: string) =>
  isRecord(value) ? value[key] : undefined;

export const unwrapValue = (value: unknown, keys: string[]) => {
  if (!isRecord(value)) {
    return value;
  }

  for (const key of keys) {
    const nestedValue = getValue(value, key);

    if (nestedValue) {
      return nestedValue;
    }
  }

  return value;
};

export const unwrapArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value;
  }

  const data = getValue(value, 'data');

  return Array.isArray(data) ? data : [];
};

export const toNumber = (value: unknown) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : null;
};

export const toStringValue = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

export const toBoolean = (value: unknown) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value === 1 || value === '1' || value === 'true') {
    return true;
  }

  if (value === 0 || value === '0' || value === 'false') {
    return false;
  }

  return undefined;
};
