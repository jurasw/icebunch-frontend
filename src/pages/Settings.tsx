import { Center, Text, VStack } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
// import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";
import DragDrop from "../components/Settings/DragDrop";

const Settings = () => {
  //   const [iceCream, setIceCream] = useState<IceCream[]>([]);
  // const user = useAuthStore((state) => state.user);

  return (
    <>
      <Nav />
      <VStack>

      <Center>
        <Text fontSize={"2xl"} as="b">
          Change your profile picture
        </Text>
        <DragDrop/>
      </Center>
      </VStack>

    </>
  );
};

export default Settings;
