import { Avatar } from "@chakra-ui/react";
import { Review } from "../../models/Review";
import RatingWithCounter from "./RatingWithCounter";

interface Props {
  reviews: Review[] | undefined;
}

function ReviewParagraph(props: Props) {
  return (
    <>
      {props.reviews?.map((review) => (
        <>
          <Avatar name="testowy user" src="https://bit.ly/dan-abramov" />
          <RatingWithCounter rating={review.rating} numReviews={69} />
          <p>{review.content}</p>
        </>
      ))}
    </>
  );
}

export default ReviewParagraph;
