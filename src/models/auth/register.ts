export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  token: string;
}
