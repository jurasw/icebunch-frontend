import {
  Flex,
  Box,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import RatingWithCounter from "./RatingWithCounter";

interface Props {
  name: string;
  imageURL: string;
  rating: number;
  number_of_ratings: number;
}

function IceCreamTile(props: Props) {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={props.imageURL}
          alt={`Picture of ${props.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box display="flex" alignItems="baseline">
          </Box>
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
            <RatingWithCounter rating={props.rating}
            numReviews={props.number_of_ratings}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default IceCreamTile;
