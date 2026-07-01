export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthSession = {
  type?: string;
  token?: string;
  value?: string;
};
