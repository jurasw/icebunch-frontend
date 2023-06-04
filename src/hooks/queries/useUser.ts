import axios from "axios";

export const useUser = () => {

  const getUserFromEmail = async (email: string) => {
    const response = await axios.get(`/users/email/${email}`);
    return response.data;
  };

  const getUserAvatarFromUserId = async (userId: string) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data.avatarUrl;
  };

  return {
    getUserFromEmail,
    getUserAvatarFromUserId
  };
};