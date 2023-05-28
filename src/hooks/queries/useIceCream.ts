import axios from "axios";
import { AllIceCreamDto, IceCream } from "../../models/IceCream";

export const useIceCream = () => {

  const getAllIceCream = async (payload: AllIceCreamDto): Promise<IceCream[]> => {
    const response = await axios.post("/ice-creams", payload);
    return response.data;
  };

  return {
    getAllIceCream
  };
};
