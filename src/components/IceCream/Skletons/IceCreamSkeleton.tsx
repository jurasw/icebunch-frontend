import { Box, GridItem, Image, Text, Flex, Skeleton } from "@chakra-ui/react";

const ReviewSkeleton = () => {
  return (
    <GridItem>
      <Box
        as="a"
        w="90%"
        maxW="lg"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Skeleton>
          <Image
            mt={5}
            src={""}
            roundedTop="lg"
            objectFit="contain"
            height="300px"
            width="100%"
          />
        </Skeleton>

        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Skeleton>
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {""}
                <Text fontSize="lg">{""}</Text>
              </Box>
            </Skeleton>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Box marginTop={"0.25em"} display="flex" alignItems="center">
              <Skeleton>
                <Box as="span" ml="2" color="gray.600" fontSize="md">
                  <Box as="span" ml="2" color="gray.600" fontSize="md"></Box>
                </Box>
              </Skeleton>
            </Box>
          </Flex>
        </Box>
      </Box>
    </GridItem>
  );
};

export default ReviewSkeleton;
