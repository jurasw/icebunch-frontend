import {
  Flex,
  Box,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import Rating from "./Rating";
// import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";


// interface RatingProps {
//   rating: number;
//   numReviews: number;
// }

// function Rating({ rating, numReviews }: RatingProps) {
//   return (
//     <Box display="flex" alignItems="center">
//       {Array(5)
//         .fill("")
//         .map((_, i) => {
//           const roundedRating = Math.round(rating * 2) / 2;
//           if (roundedRating - i >= 1) {
//             return (
//               <BsStarFill
//                 key={i}
//                 style={{ marginLeft: "1" }}
//                 color={i < rating ? "teal.500" : "gray.300"}
//               />
//             );
//           }
//           if (roundedRating - i === 0.5) {
//             return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
//           }
//           return <BsStar key={i} style={{ marginLeft: "1" }} />;
//         })}
//       <Box as="span" ml="2" color="gray.600" fontSize="sm">
//         {numReviews} review{numReviews > 1 && "s"}
//       </Box>
//     </Box>
//   );
// }

interface Props {
  name: string;
  imageURL: string;
  rating: number;
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
            <Rating rating={props.rating}
            numReviews={69}
            />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default IceCreamTile;
