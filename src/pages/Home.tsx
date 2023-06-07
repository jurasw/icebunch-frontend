import {
  Grid,
  Input,
  Center,
  FormControl,
  FormLabel,
  Switch,
  Select,
  HStack,
  GridItem,
} from "@chakra-ui/react";
import IceCreamTile from "../components/IceCreamTile";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationProps } from "antd";
import { useIceCreamQuery } from "../hooks/queries/useIceCream";
import IceCreamTileSkeleton from "../components/IceCreamTileSkeleton";

const Home = () => {
  const [searchField, setSearchField] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [sorting, setSorting] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslation();
  const { allIceCreamQuery } = useIceCreamQuery({
    searchField: searchField,
    isVegan: isVegan,
    sortKey: sorting,
    page: currentPage,
  });

  useEffect(() => {}, [
    allIceCreamQuery.data,
    searchField,
    isVegan,
    sorting,
    currentPage,
  ]);

  function handleSearchChange(event: any) {
    setSearchField(event.target.value);
    setCurrentPage(1);
  }

  function handleSortingChange(event: any) {
    setSorting(event.target.value);
    setCurrentPage(1);
  }

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  function translatePlaceholder() {
    return t("search");
  }

  return (
    <>
      <Nav />
      <Center>
        <Input
          onChange={handleSearchChange}
          marginTop={"1.5rem"}
          justifySelf={"center"}
          width={{ sm: "60%", xl: "40%" }}
          placeholder={translatePlaceholder()}
          size="lg"
        />
      </Center>
      <Center margin={"1rem"}>
        <HStack>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="vegan-form" mb="0">
              {t("only-vegan")}
            </FormLabel>
            <Switch
              onChange={() => {
                setIsVegan(!isVegan);
                setCurrentPage(1);
              }}
              id="vegan"
            />
          </FormControl>
          <Select minW={"190px"} onChange={handleSortingChange}>
            <option value={-1}>{t("rating-decreasing")}</option>
            <option value={1}>{t("rating-increasing")}</option>
          </Select>
        </HStack>
      </Center>

      <Grid
        maxW={"100%"}
        minW={"30%"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(5, 1fr)",
        }}
        gap={1}
      >
        {/* Grid items */}
        {allIceCreamQuery.isLoading ? (
          <>
            {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ].map((skelet) => (
              <IceCreamTileSkeleton key={skelet} />
            ))}
          </>
        ) : (
          <>
            {allIceCreamQuery?.data?.iceCreams?.map((icecream, index) => (
              <GridItem key={index}>
                <IceCreamTile
                  key={index}
                  name_pl={icecream.name_pl}
                  brand_pl={icecream.brand_pl}
                  name_en={icecream.name_en}
                  brand_en={icecream.brand_en}
                  imageURL={icecream.image}
                  rating={icecream.rating}
                  numberOfRatings={icecream.numberOfRatings}
                  href={`/${icecream.name_pl}-${icecream.brand_pl}/${icecream._id}`}
                  isVegan={icecream.vegan!}
                />
              </GridItem>
            ))}
          </>
        )}
      </Grid>
      <Center my={4}>
        <Pagination
          current={currentPage}
          onChange={onChange}
          pageSize={20}
          total={allIceCreamQuery?.data?.meta?.queryEntitiesCount}
          showSizeChanger={false}
        />
      </Center>
    </>
  );
};

export default Home;
