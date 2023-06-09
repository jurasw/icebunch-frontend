import { Flex, Box, useColorModeValue, Image, Text } from "@chakra-ui/react";
import { Language, useLanguageStore } from "../../zustand";
import ReviewStars from "../IceCream/ReviewStars";
import { useTranslation } from "react-i18next";

interface Props {
  name_pl: string;
  brand_pl: string;
  name_en: string;
  brand_en: string;
  imageURL: string;
  rating: number;
  numberOfRatings: number;
  href: string;
  isVegan: boolean;
}

function IceCreamTile(props: Props) {
  const language = useLanguageStore((state) => state.language);
  const { t } = useTranslation();

  return (
    <Flex m={1} w="full" alignItems="center" justifyContent="center">
      <Box
        as="a"
        maxW="90%"
        w="90%"
        href={props.href}
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {props.isVegan && (
          <Image
            src={"/vegan.webp"}
            w={"20%"}
            position="absolute"
            top={2}
            right={2}
          />
        )}
        <Image
          mt={5}
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
              maxW={"190px"}
              w={"190px"}
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {language === Language.PL && props.brand_pl}
              {language === Language.EN && props.brand_en}
              <Text fontSize="lg" isTruncated>
                {language === Language.PL && props.name_pl}
                {language === Language.EN && props.name_en}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" alignContent="center">
            <Box marginTop={"0.25em"} display="flex" alignItems="center">
              <ReviewStars rating={props.rating} />
              <Box as="span" ml="2" color="gray.600" fontSize="md">
                {""}
                {props.numberOfRatings} {t("reviewers")}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default IceCreamTile;
