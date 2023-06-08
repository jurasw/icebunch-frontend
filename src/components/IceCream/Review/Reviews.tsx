import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReviewTile from "./ReviewTile";
import { Review } from "../../../models/Review";
import { useEffect } from "react";

export enum ReviewSortProps {
  DATE_DESC = "DATE_DESC",
  DATE_ASC = "DATE_ASC",
  RATE_DESC = "RATE_DESC",
  RATE_ASC = "RATE_ASC",
}

interface Props {
  reviews: Review[] | undefined;
  sort: ReviewSortProps;
}

function Reviews({ reviews , sort }: Props) {
  const navigate = useNavigate();

  useEffect(() => {

    if (sort == ReviewSortProps.RATE_ASC) {
      reviews
        ?.map((item, index) => ({ index, item }))
        .sort((a, b) => a.item.rating - b.item.rating)
        .map((entry) => entry.item);
    }

    if (sort == ReviewSortProps.RATE_DESC) {
      reviews
        ?.map((item, index) => ({ index, item }))
        .sort((a, b) => b.item.rating - a.item.rating)
        .map((entry) => entry.item);
    }

    if (sort == ReviewSortProps.DATE_ASC) {
      reviews
        ?.map((item, index) => ({ index, item }))
        .sort(
          (a, b) =>
            new Date(a.item.lastUpdate).getTime() -
            new Date(b.item.lastUpdate).getTime()
        )
        .map((entry) => entry.item);
    }

    if (sort == ReviewSortProps.DATE_DESC) {
      reviews
        ?.map((item, index) => ({ index, item }))
        .sort(
          (a, b) =>
            new Date(b.item.lastUpdate).getTime() -
            new Date(a.item.lastUpdate).getTime()
        )
        .map((entry) => entry.item);
    }
  });

  return (
    <Box overflow={"scroll"} maxH={"350px"}>
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
          <ReviewTile
            userId={review.userId}
            content={review.content}
            rating={review.rating}
          />
        </Box>
      ))}
    </Box>
  );
}

export default Reviews;
