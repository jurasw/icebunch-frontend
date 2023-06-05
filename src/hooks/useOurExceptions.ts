import { AxiosError } from 'axios';
import { getEnumFromError, OurExceptionType } from '../common/errors';
import { useToast } from '@chakra-ui/react';

export const useOurExceptions = () => {
  const toast = useToast();

  const handleLoginError = (error: AxiosError) => {
    const customErrorEnum = getEnumFromError(error);

    let message = '';

    switch (customErrorEnum) {
      case OurExceptionType.LOGIN_EMAIL_CONFIRMATION_REQUIRED:
        message = 'Email is not confirmed';
        break;
      default:
        message = 'Something went wrong';
    }

    toast({
      title: 'Error while logging',
      description: message,
      status: 'error',
    });
  };

  return {
    handleLoginError,
  };
};