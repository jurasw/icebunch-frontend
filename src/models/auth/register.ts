export interface RegisterPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    email: string;
    token: string;
  }
  