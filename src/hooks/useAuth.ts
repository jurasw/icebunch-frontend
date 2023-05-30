import axios from "axios";
import jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  ResetPasswordDTO,
  ResetPasswordEmailDTO,
  User,
  UserForm,
} from "../models/User";
import { useAuthStore } from "../zustand";

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

  const googleLogin = async (token: string) => {
    const response = await axios.post("auth/google/login", {
      googleToken: token,
    });
    return response.data;
  };

  const formSignup = async (payload: UserForm): Promise<User> => {
    const response = await axios.post(`auth/register`, payload);
    return response.data;
  };

  const formLogin = async (payload: UserForm): Promise<User> => {
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
    onSuccess: async (response: LoginResponse) => {
      onSuccessfulLogin(response);
    },
  });

  const onSuccessfulLogin = (response: LoginResponse) => {
    loginToStore({ email: response.email, token: response.token });
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.token;
    console.log(response);
    navigate("/");
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

  // const isLoggedIn = useAuthStore((state) => state.user != null);
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

  const postResetPasswordEmail = async (payload: ResetPasswordEmailDTO) => {
    const response = await axios.post(`/auth/reset-password-email`, payload);
    return response.data;
  };

  const postResetPassword = async (payload: ResetPasswordDTO) => {
    const response = await axios.post(`/auth/reset-password`, payload);
    return response.data;
  };

  const getConfirmMutation = useMutation(getConfirm, {
    onSuccess: () => {},
  });

  const postResetPasswordEmailMutation = useMutation(postResetPasswordEmail, {
    onSuccess: () => {},
  });

  const postResetPasswordMutation = useMutation(postResetPassword, {
    onSuccess: () => {},
  });

  return {
    googleLoginMutation,
    formSignupMutation,
    formLoginMutation,
    isLoggedIn,
    logout,
    getConfirmMutation,
    postResetPasswordEmailMutation,
    postResetPasswordMutation,
  };
};
