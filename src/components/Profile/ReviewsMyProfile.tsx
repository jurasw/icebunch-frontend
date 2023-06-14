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
import { useAuthStore } from "../../zustand";
import { useUser } from "../../hooks/queries/useUser";
import { getAllIceCream } from "../../hooks/queries/useIceCream";
import { IceCream } from "../../models/IceCream";
import SkeletonProfileReview from "./SkeletonProfileReview";
import { Path } from "../../pages/Paths";

const ReviewsMyProfile = () => {
  const [reviews, setReviews] = useState<Review[]>();
  const [iceCream, setIceCream] = useState<IceCream[]>();
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);

  const { getUserFromEmail } = useUser();
  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        const userData = await getUserFromEmail(user.email);
        setReviews(await getUserReviewsById(userData._id));
        await getAllIceCream().then((response) => {
          setIceCream(response);
          setLoading(false);
        });
      }
    };
    fetchReviews();
  }, []);

  const getIceCreamImage = (userIceCreamId: string): string | undefined => {
    const thisIceCream = iceCream?.find(
      (element) => element._id == userIceCreamId
    );
    return thisIceCream?.image;
  };

  const getIceCreamHref = (userIceCreamId: string): string | undefined => {
    const thisIceCream = iceCream?.find(
      (element) => element._id == userIceCreamId
    );
    return `..${Path.ICE_CREAMS}/${thisIceCream?.name_pl}=${thisIceCream?.brand_pl}/${thisIceCream?._id}`;
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
      {loading ? (
        <SkeletonProfileReview />
      ) : (
        <>
          {reviews?.map((review, index) => (
            <GridItem key={index}>
              <Card as={"a"} href={getIceCreamHref(review.iceCreamId)}>
                <CardHeader>
                  <Heading size="md">
                    <Box
                      marginTop={"0.25em"}
                      display="flex"
                      alignItems="center"
                    >
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
        </>
      )}
    </Grid>
  );
};

export default ReviewsMyProfile;
