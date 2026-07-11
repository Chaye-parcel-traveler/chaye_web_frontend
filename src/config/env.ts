import { z } from 'zod';

const absoluteUrl = z
  .string()
  .trim()
  .url()
  .transform((value) => value.replace(/\/$/, ''));

const publicAssetUrl = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => value.startsWith('/') || /^https?:\/\//i.test(value),
    'Asset URL must be absolute or start with /.',
  )
  .transform((value) =>
    /^https?:\/\//i.test(value) ? value.replace(/\/$/, '') : value,
  );

const booleanFlag = z.preprocess((value) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
  }

  return false;
}, z.boolean());

const rawEnv = import.meta.env;

const envSchema = z.object({
  apiAssetsUrl: absoluteUrl,
  apiUrl: absoluteUrl,
  appEnv: z.enum(['development', 'test', 'production', 'e2e']),
  isDev: z.boolean(),
  isE2E: z.boolean(),
  isProd: z.boolean(),
  publicAssetsUrl: publicAssetUrl,
  useApiMocks: z.boolean(),
});

const resolveAppEnv = () => {
  if (rawEnv.VITE_APP_ENV) {
    return rawEnv.VITE_APP_ENV;
  }

  if (rawEnv.MODE === 'test') {
    return 'test';
  }

  if (rawEnv.MODE === 'e2e') {
    return 'e2e';
  }

  return rawEnv.PROD ? 'production' : 'development';
};

export const appEnv = envSchema.parse({
  apiAssetsUrl:
    rawEnv.VITE_API_ASSETS_URL ??
    rawEnv.VITE_API_URL ??
    'http://localhost:3333',
  apiUrl: rawEnv.VITE_API_URL ?? 'http://localhost:3333',
  appEnv: resolveAppEnv(),
  isDev: rawEnv.DEV,
  isE2E: booleanFlag.parse(rawEnv.VITE_E2E) || rawEnv.MODE === 'e2e',
  isProd: rawEnv.PROD,
  publicAssetsUrl: rawEnv.VITE_PUBLIC_ASSETS_URL ?? '/',
  useApiMocks: booleanFlag.parse(rawEnv.VITE_USE_API_MOCKS),
});

export type AppEnv = typeof appEnv;
