import { Center, Text } from "@chakra-ui/react";
import { Nav } from "../components/Nav";
// import { SearchIcon } from "@chakra-ui/icons";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { IceCream } from "../models/IceCream";
// import { useAuthStore } from "../zustand";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const Profile = () => {

  const { viewedUserId } = useParams();
  const [viewedUser, setViewedUser] = useState<any>();
//   const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchViewedUser = async () => {
    const viewedUser = await axios.get(`/users/${viewedUserId}`);
    console.log('viewed user' + viewedUser.data.email)
    setViewedUser(viewedUser.data)
    };
    fetchViewedUser();
  }, []);

  return (
    <>
      <Nav />
      <Center>
        <Text
        fontSize={"6xl"}
        as='b'
        >
        {viewedUser?.email}
        {viewedUser?.profilePictureUrl}
        </Text>
      </Center>
    </>
  )
};

export default Profile;
