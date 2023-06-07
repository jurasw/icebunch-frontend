import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
  Box,
  Image,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserReviewsById } from "../../hooks/queries/useReviews";
import { Review } from "../../models/Review";
import ReviewStars from "../IceCream/ReviewStars";
import { getAllIceCream } from "../../hooks/queries/useIceCream";
import { IceCream } from "../../models/IceCream";

interface Params {
  userId: string;
}

const ReviewsProfile = ({ userId }: Params) => {
  const [reviews, setReviews] = useState<Review[]>();
  const [iceCream, setIceCream] = useState<IceCream[]>();

  useEffect(() => {
    const fetchReviews = async () => {
      setReviews(await getUserReviewsById(userId));
      setIceCream(await getAllIceCream());
    };
    fetchReviews();
  }, []);

  const getIceCreamImage = (userIceCreamId: string): string | undefined => {
    const thisIceCream = iceCream?.find(
      (element) => element._id == userIceCreamId
    );
    return thisIceCream?.image;
  };

  return (
    <Grid
      maxW={"100%"}
      minW={"30%"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      gap={1}
    >
      {/* Grid items */}
      {reviews?.map((review, index) => (
        <GridItem key={index}>
          <Card>
            <CardHeader>
              <Heading size="md">
                <Box marginTop={"0.25em"} display="flex" alignItems="center">
                  <ReviewStars rating={review.rating} />
                </Box>
              </Heading>
            </CardHeader>
            <CardBody>
              <HStack>
                <Image
                  mr={3}
                  h="75px"
                  w="auto"
                  src={getIceCreamImage(review.iceCreamId)}
                />
                <Text>{review.content} </Text>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ReviewsProfile;