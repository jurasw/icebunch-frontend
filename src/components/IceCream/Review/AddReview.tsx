import { Button, Text, useColorMode } from "@chakra-ui/react";
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
import { ConfigProvider, Rate, theme } from "antd";
import { useTranslation } from "react-i18next";
import TextArea from "antd/es/input/TextArea";

function AddReview() {
  const toast = useToast();
  const { iceCreamId } = useParams();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { t } = useTranslation();

  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const { iceCreamReviewsQuery, createMutation } = useReviews({
    iceCreamId: iceCreamId!,
  });
  const { getUserFromEmail } = useUser();

  const [userData, setUserData] = useState<UserDB>();

  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(0);

  const handleRatingStars = (value: number) => {
    setReviewRating(value);
    console.log(reviewRating);
  };

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

  const createReview = () => {
    if (!user) {
      navigate(Path.LOGIN);
      return;
    }
    if (reviewRating != 0) {
      createMutation.mutate({
        rating: reviewRating,
        content: reviewContent,
        iceCreamId: iceCreamId!,
        userId: userData!._id,
        username: userData!.username,
        lastUpdate: new Date(),
      });
    } else {
      toast({
        title: t("toast-rating"),
        status: "info",
      });
    }
  };
  const translatePlaceholder = () => {
    return t("share-your-thoughts");
  };

  return (
    <>
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        color="primary"
        fontWeight={"500"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        {t("my-review")}
      </Text>
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
                style={{
                  color: "black",
                  fontSize: "30px",
                  marginBottom: "20px",
                }}
                onChange={handleRatingStars}
              />
              <ConfigProvider
                theme={{
                  algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                }}
              >
                <TextArea
                  showCount
                  maxLength={900}
                  onChange={handleFieldContent}
                  placeholder={translatePlaceholder()}
                />
              </ConfigProvider>
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
            onClick={createReview}
            variant="primaryButton"
            isLoading={createMutation.isLoading}
          >
            {t("add-review")}
          </Button>
        </>
      )}
    </>
  );
}

export default AddReview;
