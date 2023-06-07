import axios from "axios";
import { AllIceCream, AllIceCreamDto, IceCream } from "../../models/IceCream";
import { useQuery } from "react-query";

export const ICE_CREAM_QUERY_KEY = "iceCream";
export const ALL_ICE_CREAM_QUERY_KEY = "allIceCream";

interface Params {
  iceCreamId: string;
}

export const getAllIceCream = async (): Promise<IceCream[]> => {
  const response = await axios.get("/ice-creams");
  return response.data;
};

export const useIceCreamQuery = (params: AllIceCreamDto) => {
  const getIceCreamQuery = async (
    payload: AllIceCreamDto
  ): Promise<AllIceCream> => {
    const response = await axios.post("/ice-creams", payload);
    return response.data;
  };

  const allIceCreamQuery = useQuery({
    queryKey: ICE_CREAM_QUERY_KEY,
    queryFn: () => getIceCreamQuery(params),
  });

  return {
    allIceCreamQuery,
  };
};

export const useIceCream = (params: Params) => {
  const getIceCreamQuery = async (
    payload: AllIceCreamDto
  ): Promise<IceCream[]> => {
    const response = await axios.post("/ice-creams", payload);
    return response.data;
  };

  const getIceCream = async (iceCreamId: string): Promise<IceCream> => {
    const response = await axios.get(`/ice-creams/${iceCreamId}`);
    return response.data;
  };

  const iceCreamQuery = useQuery({
    queryKey: ICE_CREAM_QUERY_KEY,
    queryFn: () => getIceCream(params.iceCreamId),
  });

  return {
    getIceCreamQuery,
    getIceCream,
    iceCreamQuery,
  };
};
