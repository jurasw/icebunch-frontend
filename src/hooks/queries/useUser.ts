import axios from "axios";

export const useUser = () => {

  const getUserAvatarFromEmail = async (email: string) => {
    const response = await axios.get(`/users/email/${email}`);
    return response.data.avatarUrl;
  };

  const getUserAvatarFromUserId = async (userId: string) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data.avatarUrl;
  };

  return {
    getUserAvatarFromEmail,
    getUserAvatarFromUserId
  };
};