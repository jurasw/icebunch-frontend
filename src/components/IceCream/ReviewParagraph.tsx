import RatingWithCounter from "./RatingWithCounter";
import { Box } from "@chakra-ui/react";

// interface ReviewProps {
//     rating: number | undefined;
//     numReviews: number | undefined;
//   }
  
  function ReviewParagraph({ reviews }: any) {
    return reviews.map(({ content, rating }: any) => {
         (
          <Box display="flex" alignItems="center">
            <RatingWithCounter rating={rating}
                numReviews={1}
                />
            <p>{content}</p>
          </Box>
        );
    })
  }

export default ReviewParagraph;