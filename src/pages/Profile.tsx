import { Avatar, Center, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import ReviewsProfile from "../components/Profile/ReviewsProfile";

const Profile = () => {
  const { userId } = useParams();
  const [viewedUser, setViewedUser] = useState<any>();

  useEffect(() => {
    const fetchViewedUser = async () => {
      const viewedUser = await axios.get(`/users/${userId}`);
      console.log("viewed user" + viewedUser.data.email);
      setViewedUser(viewedUser.data);
    };
    fetchViewedUser();
  }, []);

  return (
    <>
      <Nav />
      <Center margin={8}>
        <VStack spacing={8}>
          <Text fontSize={"4xl"} as="b">
            {viewedUser?.email}
          </Text>
          <Avatar size="2xl" src={viewedUser?.avatarUrl} />
          <Text fontSize='xl' as='b'>Reviews: </Text>
          <ReviewsProfile userId={userId!} />
        </VStack>
      </Center>
    </>
  );
};

export default Profile;
