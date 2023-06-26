import axios from "axios";
import { newUsernameDto } from "../../models/auth/User";

export const useUser = () => {
  const getUserFromEmail = async (email: string) => {
    const response = await axios.get(`/users/email/${email}`);
    return response.data;
  };

  const getUserFromId = async (userId: string) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  };

  const changeUserUsername = async (payload: newUsernameDto) => {
    const response = await axios.put(`/user-profile/new-username`, payload);
    return response.data;
  };

  return {
    getUserFromEmail,
    getUserFromId,
    changeUserUsername,
  };
};
