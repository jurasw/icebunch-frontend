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
  HStack,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Language, useLanguageStore } from "../zustand";
import Nav from "../components/Nav";
import { useReviews } from "../hooks/queries/useReviews";
import AddReview from "../components/IceCream/Review/AddReview";
import Reviews, {
  ReviewSortProps,
} from "../components/IceCream/Review/Reviews";
import ReviewStars from "../components/IceCream/ReviewStars";
import { useTranslation } from "react-i18next";
import { useIceCream } from "../hooks/queries/useIceCream";
import ReviewSkeleton from "../components/IceCream/Skletons/ReviewSkeleton";

export default function IceCream() {
  const { iceCreamId } = useParams();

  const language = useLanguageStore((state) => state.language);

  const { iceCreamReviewsQuery } = useReviews({ iceCreamId: iceCreamId! });
  const { iceCreamQuery } = useIceCream({ iceCreamId: iceCreamId! });

  const [sorting, setSorting] = useState<ReviewSortProps>(
    ReviewSortProps.DATE_DESC
  );

  const { t } = useTranslation();

  useEffect(() => {}, [iceCreamReviewsQuery.data, iceCreamQuery.data]);

  function handleSortingChange(event: any) {
    setSorting(event.target.value);
  }

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
            {iceCreamQuery.isLoading ? (
              <Skeleton
                w={["40%", "40%", "40%", "90%"]}
                h={["40vh", "40vh", "40vh", "90vh"]}
                rounded="lg"
              ></Skeleton>
            ) : (
              <Image
                objectFit="contain"
                alt={"product image"}
                src={iceCreamQuery?.data?.image}
                align={"center"}
                maxW={"100%"}
                mx="auto"
                maxH={["40vh", "40vh", "40vh", "90vh"]}
              />
            )}
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              {iceCreamQuery.isLoading && (
                <>
                  <Skeleton h={50} mb={2} />
                  <Skeleton h={30} mb={2} />
                </>
              )}
              <HStack>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  mr={4}
                >
                  {language === Language.PL && iceCreamQuery?.data?.brand_pl}
                  {language === Language.EN && iceCreamQuery?.data?.brand_en}
                </Heading>
                {iceCreamQuery?.data?.vegan && (
                  <Image src="/vegan.png" h={[35, 35, 35, 50]} />
                )}
              </HStack>

              <Text fontSize={{ base: "l", sm: "xl", lg: "2xl" }}>
                {language === Language.PL && iceCreamQuery?.data?.name_pl}
                {language === Language.EN && iceCreamQuery?.data?.name_en}
              </Text>

              <Skeleton h={30} mb={2} isLoaded={!iceCreamQuery.isLoading}>
                <Box marginTop={"0.25em"} display="flex" alignItems="center">
                  <ReviewStars rating={iceCreamQuery?.data?.rating} />
                  <Box as="span" ml="2" color="gray.600" fontSize="md">
                    {iceCreamQuery?.data?.numberOfRatings} {t("reviewers")}
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

                {iceCreamQuery.isLoading && <Skeleton h={30} mb={2} />}

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
              </Box>
            </Stack>
            <Box>
              <HStack>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="primary"
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  {t("reviews")}
                </Text>
                <Select maxW={"190px"} onChange={handleSortingChange}>
                  <option value={ReviewSortProps.DATE_DESC}>
                    {t("date-decreasing")}
                  </option>
                  <option value={ReviewSortProps.DATE_ASC}>
                    {t("date-increasing")}
                  </option>
                  <option value={ReviewSortProps.RATE_DESC}>
                    {t("rating-decreasing")}
                  </option>
                  <option value={ReviewSortProps.RATE_ASC}>
                    {t("rating-increasing")}
                  </option>
                </Select>
              </HStack>
              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    <Reviews
                      reviews={iceCreamReviewsQuery.data}
                      sort={sorting}
                    />
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
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              color="primary"
              fontWeight={"500"}
              textTransform={"uppercase"}
              mb={"4"}
            >
              {t("my-review")}
            </Text>
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />
            <AddReview />
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
