import axios from "axios";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../zustand";
import { useToast } from "@chakra-ui/react";
import { RegisterPayload } from "../models/auth/register";
import { LoginPayload } from "../models/auth/login";
import { NewPasswordDto, ResetPasswordDto } from "../models/auth/resetPassword";

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

  const googleLogin = async (token: string) => {
    const response = await axios.post("auth/google/login", {
      googleToken: token,
    });
    return response.data;
  };

  const formSignup = async (payload: RegisterPayload) => {
    const response = await axios.post(`auth/register`, payload);
    return response.data;
  };

  const formLogin = async (payload: LoginPayload) => {
    const response = await axios.post(`auth/login`, payload);
    return response.data;
  };

  const googleLoginMutation = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
  });

  const formLoginMutation = useMutation(formLogin, {
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
  });

  const formSignupMutation = useMutation(formSignup, {
    onSuccess: async () => {
      onSuccessfulRegistration();
    },
  });

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
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const postResetPassworMutation = useMutation(postResetPassword, {
    onSuccess: () => {
      toast({
        title: "Email successfully sent!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const postNewPasswordMutation = useMutation(postNewPassword, {
    onSuccess: () => {
      toast({
        title: "Password successfully changed!",
        status: "success",
        duration: 5000,
        isClosable: true,
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
