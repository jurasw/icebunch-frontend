import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface Props {
  rating: number | undefined;
  numReviews: number | undefined;
}

function RatingWithCounter({ rating, numReviews }: Props) {
  return (
    <Box marginTop={"0.25em"} display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          if (rating) {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  size={"21px"}
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "#FFD700" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return (
                <BsStarHalf
                  size={"21px"}
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={"#FFD700"}
                />
              );
            }
            return (
              <BsStar
                size={"21px"}
                key={i}
                style={{ marginLeft: "1" }}
                color={"#FFD700"}
              />
            );
          }
          return (
            <BsStar
              size={"21px"}
              key={i}
              style={{ marginLeft: "1" }}
              color={"#FFD700"}
            />
          );
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="md">
        {numReviews} review
      </Box>
    </Box>
  );
}

export default RatingWithCounter;
