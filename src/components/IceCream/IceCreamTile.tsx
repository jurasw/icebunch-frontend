import { Flex, Box, useColorModeValue, Image } from "@chakra-ui/react";
import RatingWithCounter from "./RatingWithCounter";
interface Props {
  name: string;
  imageURL: string;
  rating: number;
  number_of_ratings: number;
  href: string;
}

function IceCreamTile(props: Props) {


  return (
    <Flex m={1} w="full" alignItems="center" justifyContent="center">
      <Box
        as={"a"}
        minW={"250px"}
        href={props.href}
        bg={useColorModeValue("white", "gray.800")}
        maxW="lg"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={props.imageURL}
          roundedTop="lg"
          objectFit="contain"
          height="300px"
          width="100%"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <RatingWithCounter
              rating={props.rating}
              numReviews={props.number_of_ratings}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default IceCreamTile;
