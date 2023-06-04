import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReviewTile from "./ReviewTile";
import { Review } from "../../../models/Review";

interface Props {
  reviews: Review[] | undefined;
}

function Reviews({ reviews }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {reviews?.map((review) => (
        <Box
          key={review.userId}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          margin={"0.5em"}
          padding={"1em"}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`/profile/${review.userId}`);
          }}
        >
          <ReviewTile userId={review.userId} content={review.content} />
        </Box>
      ))}
    </>
  );
}

export default Reviews;
