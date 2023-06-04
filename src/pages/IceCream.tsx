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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Language, useAuthStore, useLanguageStore } from "../zustand";
import RatingWithCounter from "../components/IceCream/RatingWithCounter";
import Nav from "../components/Nav";
import { useReviews } from "../hooks/queries/useReviews";
import { useUser } from "../hooks/queries/useUser";
import { UserDB } from "../models/User";
import AddReview from "../components/IceCream/Review/AddReviews";
import Reviews from "../components/IceCream/Review/Reviews";

export default function IceCream() {
  const { iceCreamId } = useParams();

  const user = useAuthStore((state) => state.user);
  const language = useLanguageStore((state) => state.language);

  const { getUserFromEmail } = useUser();
  const { iceCreamReviewsQuery } = useReviews({ iceCreamId: iceCreamId! });

  const [iceCream, setIceCream] = useState<IceCream>();
  const [userData, setUserData] = useState<UserDB>();

  useEffect(() => {
    const fetchIceCream = async () => {
      const result = await axios.get(`/ice-creams/${iceCreamId}`);
      setIceCream(result.data);
    };
    fetchIceCream();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {}, [iceCreamReviewsQuery.data]);

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
            <Image
              objectFit="contain"
              alt={"product image"}
              src={iceCream?.image}
              align={"center"}
              maxW={"100%"}
              maxH="95vh"
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={"header"}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {language === Language.PL && iceCream?.brand_pl}
                {language === Language.EN && iceCream?.brand_en}
              </Heading>
              <Text fontSize={{ base: "l", sm: "xl", lg: "2xl" }}>
                {language === Language.PL && iceCream?.name_pl}
                {language === Language.EN && iceCream?.name_en}
              </Text>
              <RatingWithCounter
                rating={iceCream?.rating}
                numReviews={iceCream?.number_of_ratings}
              />
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
                  Description
                </Text>
                <Text
                  color={useColorModeValue("gray.500", "gray.400")}
                  fontSize={"2xl"}
                  fontWeight={"300"}
                >
                  {language === Language.PL && iceCream?.description_pl}
                  {language === Language.EN && iceCream?.description_en}
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color="primary"
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  REVIEWS
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      <Reviews
                        reviews={iceCreamReviewsQuery.data?.filter(
                          (x) => x.userId != userData?._id
                        )}
                      />
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </Stack>
            <AddReview />
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
