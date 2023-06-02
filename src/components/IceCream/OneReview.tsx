import { Avatar, Box } from "@chakra-ui/react";
import { Review } from "../../models/Review";
import RatingWithoutCounter from "./RatingWithoutCounter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/queries/useUser";

interface Props {
  review: Review | undefined;
}

function OneReview(props: Props) {

  const [avatarUrl, setAvatarUrl] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAvatar = async () => {
        if (props.review) {
            
      const { getUserAvatarFromUserId } = useUser();
      const result = await getUserAvatarFromUserId(props?.review?.userId)
      setAvatarUrl(result);
    }
    };
    fetchAvatar();
  }, []);

  return (
    <>
        <Box
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        margin={'0.5em'}
        padding={'1em'}
        _hover={{cursor:"pointer"}}
        onClick={() => {
          navigate(`/profile/${props?.review?.userId}`)
        }}
        >
          <Avatar name="testowy user" src={avatarUrl} />
          {props?.review?.username}
          <RatingWithoutCounter rating={props?.review?.rating} />
          <p>{props?.review?.content}</p>
          </Box>
    </>
  );
}

export default OneReview;
