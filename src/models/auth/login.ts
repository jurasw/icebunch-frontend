export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}
