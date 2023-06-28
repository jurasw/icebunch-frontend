import axios from "axios";
import { newUsernameDto } from "../../models/auth/User";
import { useToast } from "@chakra-ui/react";

export const useUser = () => {
  const toast = useToast()
  const getUserFromEmail = async (email: string) => {
    const response = await axios.get(`/users/email/${email}`);
    return response.data;
  };

  const getUserFromId = async (userId: string) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
  };

  const changeUserUsername = async (payload: newUsernameDto) => {
    const response = await axios.put(`/user-profile/new-username`, payload)
    .catch(()=> {
      toast.closeAll()
      toast({
        title: "Username already exists!",
        status: "error",
      });
      }
    )
    return response?.data;
  };

  return {
    getUserFromEmail,
    getUserFromId,
    changeUserUsername,
  };
};
