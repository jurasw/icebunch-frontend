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
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Language, useLanguageStore } from "../zustand";
import Nav from "../components/Nav/Nav";
import { useReviews } from "../hooks/queries/useReviews";
import AddReview from "../components/IceCream/Review/AddReview";
import Reviews, {
  ReviewSortProps,
} from "../components/IceCream/Review/Reviews";
import ReviewStars from "../components/IceCream/ReviewStars";
import { useTranslation } from "react-i18next";
import { useIceCream } from "../hooks/queries/useIceCream";
import ReviewSkeleton from "../components/IceCream/Skletons/ReviewSkeleton";
import { Helmet } from "react-helmet";

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



  const ldJson = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `${iceCreamQuery?.data?.brand_pl}{" "}${iceCreamQuery?.data?.description_pl}`,
    "image": `${iceCreamQuery?.data?.image}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": `${iceCreamQuery?.data?.rating}`,
      "bestRating": "",
      "worstRating": "",
      "ratingCount": `${iceCreamQuery?.data?.numberOfRatings}`
    }
  }





  return (
    <>
    <Helmet>
        <title>{`${iceCreamQuery?.data?.brand_pl} ${iceCreamQuery?.data?.name_pl}`}</title>
        <meta name="description" content={iceCreamQuery?.data?.brand_pl} />
        <meta property="og:image" content={iceCreamQuery?.data?.image} />
        <meta property="og:image:secure_url" content={iceCreamQuery?.data?.image} />
        <script type="application/ld+json">
        {JSON.stringify(ldJson)}
      </script>
    </Helmet>
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
                  <Image src="/vegan.webp" h={[35, 35, 35, 50]} />
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
              <AddReview />
              <Box>
                <HStack pr={2}>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="primary"
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    my={"auto"}
                  >
                    {t("reviews")}
                  </Text>
                  <Spacer />
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
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
