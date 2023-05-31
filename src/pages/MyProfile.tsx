import { Center, Text } from "@chakra-ui/react";
import { Nav, UserNav } from "../components/Nav";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";

const MyProfile = () => {
//   const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {user ? <UserNav /> : <Nav />}
      <Center>
        <Text
        fontSize={"6xl"}
        as='b'
        >
        Welcome {user?.email}
        </Text>
      </Center>
    </>
  )
};

export default MyProfile;
