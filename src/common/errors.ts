import { AxiosError } from 'axios';

export const enum OurExceptionType {
  LOGIN_EMAIL_CONFIRMATION_REQUIRED = 'LOGIN_EMAIL_CONFIRMATION_REQUIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
}

export const getEnumFromError = (error: AxiosError) => {
  const response = error.response;

  if (response?.status != 420) {
    return;
  }

  const customMessageEnum = (response.data as any).message as OurExceptionType;

  return customMessageEnum ?? null;
};
