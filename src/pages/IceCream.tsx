import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Textarea,
} from "@chakra-ui/react";
// import { SendReviewDTO } from "../models/Review";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Review, SendReviewDTO } from "../models/Review";
import ReviewParagraph from "../components/IceCream/ReviewParagraph";
import { Language, useAuthStore, useLanguageStore } from "../zustand";
import RatingWithCounter from "../components/IceCream/RatingWithCounter";
import Nav from "../components/Nav";
import { Path } from "./Paths";

export default function IceCream() {
  const { id } = useParams();
  const language = useLanguageStore((state) => state.language);
  const user = useAuthStore((state) => state.user);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [iceCream, setIceCream] = useState<IceCream>();
  const [reviews, setReviews] = useState<Review[]>();
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(1.5);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserEmail = async () => {
      const result = await axios.get(`/users/email/${user?.email}`);
      setUserEmail(result.data.email);
      setUserId(result.data._id);
      const username = result.data.email.split("@")[0];
      setUsername(username);
    };
    getUserEmail();

    setReviewRating(2);
  }, []);

  const handleFieldContent = (event: any) => {
    setReviewContent(event.target.value);
  };

  useEffect(() => {
    const fetchIceCream = async () => {
      const result = await axios.get(`/ice-creams/${id}`);
      setIceCream(result.data);
    };
    fetchIceCream();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await axios.get(`reviews/ice-cream/${id}`);
      if (result) {
        setReviews(result?.data);
      }
    };
    fetchReviews();
  }, []);

  const sendReview = async (payload: SendReviewDTO) => {
    await axios.put(`/reviews`, payload);
  };

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
                  color={useColorModeValue("yellow.500", "yellow.300")}
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
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  REVIEWS
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={"span"} fontWeight={"bold"}>
                      <ReviewParagraph reviews={reviews} />
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </Stack>
            {user && (
              <Textarea
                // value={value}
                onChange={handleFieldContent}
                // onChange={handleFieldContent}
                resize={"none"}
                placeholder="Share your thoughts about this one"
              />
            )}

            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              as={"a"}
              onClick={() => {
                if (!user) {
                  navigate(Path.LOGIN);
                }
                if (id && userEmail) {
                  sendReview({
                    rating: reviewRating,
                    content: reviewContent,
                    iceCreamId: id,
                    userId: userId,
                    username: username,
                  });
                }
              }}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
                cursor: "pointer",
              }}
            >
              Add review
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
