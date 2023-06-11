import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeleteReviewDto, Review, CreateReviewDto, UpdateReviewDto } from "../../models/Review";

export const REVIEWS_QUERY_KEY = "reviews";

export const getUserReviewsById = async (
  userId: string
): Promise<Review[]> => {
  const response = await axios.get(`/reviews/user/${userId}`);
  return response.data;
};

interface Params {
  iceCreamId: string;
}

export const useReviews = (params: Params) => {
  const queryClient = useQueryClient();

  const getIceCreamReviews = async (id: string): Promise<Review[]> => {
    const response = await axios.get(`/reviews/ice-cream/${id}`);
    return response.data;
  };

  const updateMyReview = async (payload: UpdateReviewDto) => {
    const response = await axios.put(`/reviews/${payload.reviewId}`, payload);
    return response.data;
  };

  const createMyReview = async (payload: CreateReviewDto) => {
    const response = await axios.post(`/reviews`, payload);
    return response.data;
  };

  const deleteMyReview = async (dto: DeleteReviewDto) => {
    const response = await axios.delete(`/reviews/${dto.reviewId}`);
    return response.data;
  };

  const iceCreamReviewsQuery = useQuery({
    queryKey: REVIEWS_QUERY_KEY,
    queryFn: () => getIceCreamReviews(params.iceCreamId),
  });

  const updateMutation = useMutation(updateMyReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(REVIEWS_QUERY_KEY);
    },
  });


  const createMutation = useMutation(createMyReview, {
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
    updateMutation,
    createMutation,
    deleteMutation,
    iceCreamReviewsQuery,
  };
};
