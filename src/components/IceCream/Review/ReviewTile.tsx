import { Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/queries/useUser";
import { UserDB } from "../../../models/User";

interface Props {
  userId: string;
  content: string;
}

function ReviewTile({ userId, content }: Props) {
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
      <Avatar name={userData?.username} src={userData?.avatarUrl} />
      {userData?.username}
      <p>{content}</p>
    </>
  );
}

export default ReviewTile;
