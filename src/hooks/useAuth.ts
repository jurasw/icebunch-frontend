import axios from "axios";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand";
import { useToast } from "@chakra-ui/react";
import { RegisterPayload } from "../models/auth/register";
import { LoginPayload } from "../models/auth/login";
import { NewPasswordDto, ResetPasswordDto } from "../models/auth/resetPassword";
import { useOurExceptions } from "./useOurExceptions";
import { AxiosError } from "axios";

interface LoginResponse {
  email: string;
  token: string;
}
interface Token {
  exp: number;
}

export const useAuth = () => {
  const loginToStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const toast = useToast();
  const { handleLoginError } = useOurExceptions()

  const googleLogin = async (token: string) => {
    const response = await axios.post("auth/google/login", {
      googleToken: token,
    });
    return response.data;
  };

  const formSignup = async (payload: RegisterPayload) => {
    const response = await axios.post(`auth/register`, payload, {timeout: 3000});
    return response.data;
  };

  const formLogin = async (payload: LoginPayload) => {
    const response = await axios.post(`auth/login`, payload, {timeout: 3000});
    return response.data;
  };

  const googleLoginMutation = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
  });

  const formLoginMutation = useMutation(formLogin, {
    onMutate: async () => {
      toast({
        title: "Logging..",
        status: "loading",
      });
    },
    onError: async (error: AxiosError) => {
      toast.closeAll()
      handleLoginError(error);
    },
    onSuccess: async (response: LoginResponse) => {
      toast.closeAll()
      toast({
        title: "Succesfully logged in!",
        status: "success",
      });
      onSuccessfulLogin(response);
    },
  });

  const formSignupMutation = useMutation(formSignup, {
    onMutate: async () => {
      toast({
        title: "Logging..",
        status: "loading",
      });
    },
    onError: async (error: AxiosError) => {
      toast.closeAll()
      handleLoginError(error);
    },
    onSuccess: async () => {
      toast.closeAll()
      toast({
        title: "Email confirmation send!",
        status: "success",
      });
      onSuccessfulRegistration();
  }});


  const onSuccessfulLogin = (response: LoginResponse) => {
    loginToStore({ email: response.email, token: response.token });
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.token;
    console.log(response);
    navigate("/");
  };

  const onSuccessfulRegistration = () => {
    navigate("/confirm-request");
  };

  const tokenExpired = (token: string | null): boolean => {
    if (token !== null) {
      const currentTime = new Date().getTime() / 1000;
      const decoded = jwtDecode<Token>(token);
      const expirationTime = decoded.exp;

      return currentTime > expirationTime;
    } else {
      return true;
    }
  };

  const isLoggedIn: boolean = !useAuthStore(
    (state) => state.user === null || tokenExpired(state.user.token)
  );

  const logout = () => {
    loginToStore(null);
  };

  const getConfirm = async (token: string | undefined) => {
    const response = await axios.get(`/auth/confirm/${token}`);
    return response.data;
  };

  const postResetPassword = async (payload: ResetPasswordDto) => {
    const response = await axios.post(`/auth/reset-password-email`, payload);
    return response.data;
  };

  const postNewPassword = async (payload: NewPasswordDto) => {
    const response = await axios.post(`/auth/reset-password`, payload);
    return response.data;
  };

  const getConfirmMutation = useMutation(getConfirm, {
    onSuccess: () => {
      toast({
        title: "Email successfully confirmed!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const postResetPassworMutation = useMutation(postResetPassword, {
    onSuccess: () => {
      toast({
        title: "Email with password reset successfully sent!",
        status: "success",
      });
    },
  });

  const postNewPasswordMutation = useMutation(postNewPassword, {
    onSuccess: () => {
      toast({
        title: "Password successfully changed!",
        status: "success",
      });
    },
  });

  return {
    googleLoginMutation,
    formSignupMutation,
    formLoginMutation,
    isLoggedIn,
    logout,
    getConfirmMutation,
    postResetPassworMutation,
    postNewPasswordMutation,
  };
};
