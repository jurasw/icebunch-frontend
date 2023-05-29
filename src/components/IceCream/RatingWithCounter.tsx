import { Box } from "@chakra-ui/react";
  import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface RatingProps {
    rating: number | undefined;
    numReviews: number | undefined;
  }
  
  function RatingWithCounter({ rating, numReviews }: RatingProps) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => {
            console.log(rating)
            if (rating) {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
            }
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review
        </Box>
      </Box>
    );
  }

export default RatingWithCounter;