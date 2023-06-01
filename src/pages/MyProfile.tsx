import { Center, Text } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";
import Nav from "../components/Nav";

const MyProfile = () => {
  //   const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Nav />
      <Center>
        <Text fontSize={"6xl"} as="b">
          Welcome {user?.email}
        </Text>
      </Center>
    </>
  );
};

export default MyProfile;
