export interface User {
    email: string;
    token: string;
  }
  
  export interface UserForm {
    email: string;
    password: string;
  }
  
  export interface ResetPasswordEmailDTO {
    email: string;
  }
  
  export interface ResetPasswordDTO {
    password: string;
    resetPasswordToken: string | undefined;
  }
  