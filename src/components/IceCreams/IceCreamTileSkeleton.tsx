import { Flex, Box, useColorModeValue, Text, Skeleton } from "@chakra-ui/react";
import ReviewStars from "../IceCream/ReviewStars";

function IceCreamTileSkeleton() {
  return (
    <Flex m={1} w="full" alignItems="center" justifyContent="center">
      <Box
        as="a"
        maxW="90%"
        w="90%"
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Skeleton
          mt={5}
          mx={"auto"}
          height="300px"
          width="85%"
          rounded="lg"
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              maxW={"190px"}
              w={"190px"}
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              <Skeleton rounded="lg" w={"45%"}>
                <Text fontSize="lg" mb={2}>
                  {" "}
                  name{" "}
                </Text>
              </Skeleton>
              <Skeleton mb={1} rounded="lg" w={"90%"}>
                <Text fontSize="lg"> brand </Text>
              </Skeleton>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Box marginTop={"0.25em"} display="flex" alignItems="center">
              <ReviewStars rating={0} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default IceCreamTileSkeleton;
