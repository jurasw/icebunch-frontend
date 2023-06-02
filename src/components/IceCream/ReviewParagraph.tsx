import { Review } from "../../models/Review";
import OneReview from "./OneReview";

interface ReviewProps {
  reviews: Review[] | undefined;
}

function ReviewParagraph(props: ReviewProps) {

  return (
    <>
      {props.reviews?.map((review) => (
        <OneReview
        review={review}
        />
      ))}
    </>
  );
}

export default ReviewParagraph;
