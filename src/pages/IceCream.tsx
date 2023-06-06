import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Language, useLanguageStore } from "../zustand";
import Nav from "../components/Nav";
import { useReviews } from "../hooks/queries/useReviews";
import AddReview from "../components/IceCream/Review/AddReview";
import Reviews from "../components/IceCream/Review/Reviews";
import ReviewStars from "../components/IceCream/ReviewStars";
import { useTranslation } from "react-i18next";
import { useIceCream } from "../hooks/queries/useIceCream";
import ReviewSkeleton from "../components/IceCream/Skletons/ReviewSkeleton";

export default function IceCream() {
  const { iceCreamId } = useParams();

  const language = useLanguageStore((state) => state.language);

  const { iceCreamReviewsQuery } = useReviews({ iceCreamId: iceCreamId! });
  const { iceCreamQuery } = useIceCream({ iceCreamId: iceCreamId! });

  const { t } = useTranslation();

  useEffect(() => {}, [iceCreamReviewsQuery.data, iceCreamQuery.data]);

  return (
    <>
      <Nav />
      <Container maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 7, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex justifyContent={"center"}>
            <Skeleton isLoaded={!iceCreamQuery.isLoading}>
              <Image
                objectFit="contain"
                alt={"product image"}
                src={iceCreamQuery?.data?.image}
                align={"center"}
                maxW={"100%"}
                maxH="95vh"
              />
            </Skeleton>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Skeleton isLoaded={!iceCreamQuery.isLoading}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {language === Language.PL && iceCreamQuery?.data?.brand_pl}
                  {language === Language.EN && iceCreamQuery?.data?.brand_en}
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!iceCreamQuery.isLoading}>
                <Text fontSize={{ base: "l", sm: "xl", lg: "2xl" }}>
                  {language === Language.PL && iceCreamQuery?.data?.name_pl}
                  {language === Language.EN && iceCreamQuery?.data?.name_en}
                </Text>
              </Skeleton>
              <Skeleton isLoaded={!iceCreamQuery.isLoading}>
                <Box marginTop={"0.25em"} display="flex" alignItems="center">
                  <ReviewStars rating={iceCreamQuery?.data?.rating} />
                  <Box as="span" ml="2" color="gray.600" fontSize="md">
                    {""}
                    {iceCreamQuery?.data?.number_of_ratings} {t("reviewers")}
                  </Box>
                </Box>
              </Skeleton>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={"column"}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}></VStack>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="primary"
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  {t("description")}
                </Text>
                <Skeleton isLoaded={!iceCreamQuery.isLoading}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {language === Language.PL &&
                      iceCreamQuery?.data?.description_pl}
                    {language === Language.EN &&
                      iceCreamQuery?.data?.description_en}
                  </Text>
                </Skeleton>
              </Box>
            </Stack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color="primary"
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                {t("reviews")}
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    <Reviews reviews={iceCreamReviewsQuery.data} />
                    {iceCreamReviewsQuery.isLoading && (
                      <>
                        {[0, 1, 2].map((skelet) => (
                          <ReviewSkeleton key={skelet} />
                        ))}
                      </>
                    )}
                  </Text>
                </ListItem>
              </List>
            </Box>
            <AddReview />
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
