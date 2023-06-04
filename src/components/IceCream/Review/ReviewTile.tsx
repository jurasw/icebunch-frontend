import { Avatar, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/queries/useUser";
import { UserDB } from "../../../models/User";
import ReviewStars from "../ReviewStars";

interface Props {
  userId: string;
  content: string;
  rating: number | undefined;
}

function ReviewTile({ userId, content, rating }: Props) {
  const { getUserFromId } = useUser();
  const [userData, setUserData] = useState<UserDB>();

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await getUserFromId(userId);
      setUserData(result);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <HStack mb={2}>
        <Avatar name={userData?.username} src={userData?.avatarUrl} mr={4} />
        <>
          {userData?.username}
          <ReviewStars rating={rating} />
        </>
      </HStack>
      <p>{content}</p>
    </>
  );
}

export default ReviewTile;
