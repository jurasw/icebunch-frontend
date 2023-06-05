import { Center, Text, VStack } from "@chakra-ui/react";
import Nav from "../components/Nav";
import DragDrop from "../components/Settings/DragDrop";

const About = () => {


  return (
    <>
      <Nav />
      <VStack>

      <Center>
        <Text fontSize={"2xl"} as="b">
        "Life is to short to eat bad ice cream.",
        "The purpose of this site is to create reliable base of ice cream and reviews, where everyone can drop an opinion.",
        "Currently we are working on user experience improvement and also adding some new features. Have a nice cream! :)",
        "faq": "FAQ: ",
        "faq1": "1. Why I can not drop an opinon without account? ",
        "ans1": "It is necessary to restrain bot activity.",
        "faq2": "2. How much does it cost to use icebunch.com? ",
        "ans2": "Use of website is 100% free.",
        "faq3": "3. Why am I seeing ads?",
        "ans3": "We finance the website with private money. Advertising helps us with domain, hosting and license costs."
        </Text>
      </Center>
      </VStack>

    </>
  );
};

export default About;