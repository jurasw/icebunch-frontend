
export interface ResetPasswordDto {
  email: string;
}

export interface NewPasswordDto {
  password: string;
  resetPasswordToken: string;
}
