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
  Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IceCream } from "../models/IceCream";
import { Review } from "../models/Review";
import Rating from "../components/IceCream/Rating";


export default function IceCream() {
  const { id } = useParams();

  const [iceCream, setIceCream] = useState<IceCream>();
  const [reviews, setReviews] = useState<Review[]>();

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
      console.log(result.data[0].content)
      setReviews(result.data);
    };
    fetchReviews();
    if (reviews) {
      console.log('revievs' + reviews)
      // console.log('content:'+ reviews[0]?.content)
      // console.log('rating:'+ reviews[0]?.rating)

    }

  }, []);

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={iceCream?.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {iceCream?.name_pl}
            </Heading>
            <Rating rating={iceCream?.rating}
            numReviews={iceCream?.number_of_ratings}
            />
            {/* <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              $350.00 USD
            </Text> */}
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
            <VStack spacing={{ base: 4, sm: 6 }}>
           
            </VStack>
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
                {iceCream?.description_pl}
              </Text>
              {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Chronograph</ListItem>
                  <ListItem>Master Chronometer Certified</ListItem>{" "}
                  <ListItem>Tachymeter</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>Anti‑magnetic</ListItem>
                  <ListItem>Chronometer</ListItem>
                  <ListItem>Small seconds</ListItem>
                </List>
              </SimpleGrid> */}
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
                  <Avatar name='testowy user' src='https://bit.ly/dan-abramov' />                  

                  {reviews && reviews[0]?.rating}: 
                  {reviews && reviews[0]?.content}
                  </Text>{" "}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add review
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
