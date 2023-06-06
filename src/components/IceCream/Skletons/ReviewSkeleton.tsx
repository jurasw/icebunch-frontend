import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ReviewSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" m={2}>
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={2}
        spacing="4"
        skeletonHeight="2"
      />
    </Box>
  );
};

export default ReviewSkeleton;
