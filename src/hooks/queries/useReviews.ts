import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Review, SendReviewDTO } from "../../models/Review";

export const REVIEWS_QUERY_KEY = "reviews";

export const useReviews = () => {
  const queryClient = useQueryClient();

  const getIceCreamReviews = async (id: string): Promise<Review[]> => {
    const response = await axios.get(`/reviews/ice-cream/${id}`);
    return response.data;
  };

  const putMyReview = async (payload: SendReviewDTO) => {
    const response = await axios.post(`/reviews`, payload);
    return response.data;
  };

  const iceCreamReviewsQuery = (id: string) =>
    useQuery({
      queryKey: REVIEWS_QUERY_KEY,
      queryFn: () => getIceCreamReviews(id),
    });

  const putMutation = useMutation(putMyReview, {
    onSuccess: (revies: Review[]) => {
      queryClient.setQueryData(REVIEWS_QUERY_KEY, (oldData: any) => {
        return [...oldData, revies];
      });
    },
  });

  return {
    putMutation,
    iceCreamReviewsQuery,
  };
};
