import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getUserReviewsById } from "../../hooks/queries/useReviews";
import { Review } from "../../models/Review";
import ReviewStars from "../IceCream/ReviewStars";
import { useAuthStore } from "../../zustand";
import { useUser } from "../../hooks/queries/useUser";

const ReviewsMyProfile = () => {
  const [reviews, setReviews] = useState<Review[]>();
  const user = useAuthStore((state) => state.user);
  const { getUserFromEmail } = useUser();

  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        const userData = await getUserFromEmail(user.email);
        setReviews(await getUserReviewsById(userData._id));
      }
    };
    fetchReviews();
  }, []);

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
                {" "}
                <Box marginTop={"0.25em"} display="flex" alignItems="center">
                  <ReviewStars rating={review.rating} />
                </Box>
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>{review.content} </Text>
            </CardBody>
            <CardFooter>
              <Button>View here</Button>
            </CardFooter>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default ReviewsMyProfile;
