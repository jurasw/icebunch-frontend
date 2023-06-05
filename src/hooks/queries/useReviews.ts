import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteReviewDto, Review, SendReviewDto } from "../../models/Review";

export const REVIEWS_QUERY_KEY = "reviews";

interface Params {
  iceCreamId: string;
}

export const useReviews = (params: Params) => {
  const queryClient = useQueryClient();

  const getIceCreamReviews = async (id: string): Promise<Review[]> => {
    const response = await axios.get(`/reviews/ice-cream/${id}`);
    return response.data;
  };

  const putMyReview = async (payload: SendReviewDto) => {
    const response = await axios.put(`/reviews`, payload);
    return response.data;
  };

  const deleteMyReview = async (reviewId: DeleteReviewDto) => {  
    const response = await axios.delete(`/reviews/${reviewId}`);
    return response.data;
  };

  const iceCreamReviewsQuery = useQuery({
    queryKey: REVIEWS_QUERY_KEY,
    queryFn: () => getIceCreamReviews(params.iceCreamId),
  });

  const putMutation = useMutation(putMyReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(REVIEWS_QUERY_KEY);
    },
  });

  const deleteMutation = useMutation(deleteMyReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(REVIEWS_QUERY_KEY);
    },
  });

  return {
    putMutation,
    deleteMutation,
    iceCreamReviewsQuery,
  };
};
