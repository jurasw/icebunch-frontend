import { Avatar } from "@chakra-ui/react";
import { Review } from "../../models/Review";
import RatingWithoutCounter from "./RatingWithoutCounter";

interface ReviewProps {
  reviews: Review[] | undefined;
}

function ReviewParagraph(props: ReviewProps) {
  return (
    <>
      {props.reviews?.map((review) => (
        <>
          <Avatar name="testowy user" src="https://bit.ly/dan-abramov" />
          <RatingWithoutCounter rating={review.rating} />
          <p>{review.content}</p>
        </>
      ))}
    </>
  );
}

export default ReviewParagraph;
