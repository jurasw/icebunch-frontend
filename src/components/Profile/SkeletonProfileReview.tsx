import {
  Card,
  CardBody,
  CardHeader,
  GridItem,
  Heading,
  Text,
  Box,
  HStack,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import ReviewStars from "../IceCream/ReviewStars";

const SkeletonProfileReview = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((review) => (
        <GridItem key={review}>
          <Card>
            <CardHeader>
              <Heading size="md">
                <Box marginTop={"0.25em"} display="flex" alignItems="center">
                  <ReviewStars rating={0} />
                </Box>
              </Heading>
            </CardHeader>
            <CardBody>
              <HStack>
                <SkeletonCircle mr={3} size="75" />
                <Skeleton>
                  <Text>przykladowy tekst opinii</Text>
                </Skeleton>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>
      ))}
    </>
  );
};

export default SkeletonProfileReview;
