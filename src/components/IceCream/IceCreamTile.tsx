import { Flex, Box, useColorModeValue, Image, Text } from "@chakra-ui/react";
import RatingWithCounter from "./RatingWithCounter";
import { Language, useLanguageStore } from "../../zustand";

interface Props {
  name_pl: string;
  brand_pl: string;
  name_en: string;
  brand_en: string;
  imageURL: string;
  rating: number;
  number_of_ratings: number;
  href: string;
}

function IceCreamTile(props: Props) {
  const language = useLanguageStore((state) => state.language);

  return (
    <Flex m={1} w="full" alignItems="center" justifyContent="center">
      <Box
        as="a"
        w="90%"
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
              {language === Language.PL && props.brand_pl}
              {language === Language.EN && props.brand_en}
              <Text fontSize="lg">
                {language === Language.PL && props.name_pl}
                {language === Language.EN && props.name_en}
              </Text>
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
