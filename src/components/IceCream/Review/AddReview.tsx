import { Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
// import ReactStars from "react-stars";
import { useAuthStore } from "../../../zustand";
import { useNavigate, useParams } from "react-router-dom";
import { useReviews } from "../../../hooks/queries/useReviews";
import { Path } from "../../../pages/Paths";
import { UserDB } from "../../../models/User";
import { useUser } from "../../../hooks/queries/useUser";
import EditReview from "./EditReview";
import { useToast } from "@chakra-ui/react";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";

function AddReview() {
  const toast = useToast()
  const { iceCreamId } = useParams();
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { iceCreamReviewsQuery, putMutation } = useReviews({
    iceCreamId: iceCreamId!,
  });
  const { getUserFromEmail } = useUser();

  const [userData, setUserData] = useState<UserDB>();

  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(0);

  const handleRatingStars = (value: number) => {
    setReviewRating(value)
    console.log(reviewRating)
  }


  const handleFieldContent = (event: any) => {
    setReviewContent(event.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const result = await getUserFromEmail(user.email);
        setUserData(result);
      }
    };
    fetchUserData();
  }, [iceCreamReviewsQuery.data]);

  const sendReview = () => {
    if (!user) {
      navigate(Path.LOGIN);
      return
    }
    if (reviewRating!=0) {
      putMutation.mutate({
        rating: reviewRating,
        content: reviewContent,
        iceCreamId: iceCreamId!,
        userId: userData!._id,
        username: userData!.username,
        lastUpdate: new Date(),
      });
    }
    else {
      toast({
        title: t('toast-rating'),
        status: "info",
      });
    }
  
  };
  const translatePlaceholder = () => {
    return t('share-your-thoughts')
  }

  return (
    <>
      {iceCreamReviewsQuery.data?.some((el) => el.userId == userData?._id) ? (
        <EditReview
          review={iceCreamReviewsQuery.data.find(
            (x) => x.userId == userData?._id
          )}
          userId={userData?._id}
        />
      ) : (
        <>
          {user && (
            <>

              <Rate
              allowHalf
              style={{ color: 'black', fontSize: '30px' }}
              onChange={handleRatingStars}
              />
              <Textarea
                onChange={handleFieldContent}
                resize={"none"}
                placeholder={translatePlaceholder()}
              />
            </>
          )}
          <Button
            _hover={{
              cursor: "pointer",
            }}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            as={"a"}
            onClick={sendReview}
            variant="primaryButton"
            isLoading={putMutation.isLoading}
          >
            {t('add-review')}
          </Button>
        </>
      )}
    </>
  );
}

export default AddReview;
