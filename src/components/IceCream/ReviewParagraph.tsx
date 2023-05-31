import { Avatar, Box } from "@chakra-ui/react";
import { Review } from "../../models/Review";
import RatingWithoutCounter from "./RatingWithoutCounter";
import { useNavigate } from "react-router-dom";

interface ReviewProps {
  reviews: Review[] | undefined;
  // profilePictureUrl: string'

}

function ReviewParagraph(props: ReviewProps) {


  const navigate = useNavigate()
  return (
    <>
      {props.reviews?.map((review) => (
        <Box
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        margin={'0.5em'}
        padding={'1em'}
        _hover={{cursor:"pointer"}}
        onClick={() => {
          navigate(`/profile/${review.userId}`)
        }}
        >
          <Avatar name="testowy user" src="https://bit.ly/dan-abramov" />
          <RatingWithoutCounter rating={review.rating} />
          <p>{review.content}</p>
          </Box>
      ))}
    </>
  );
}

export default ReviewParagraph;
