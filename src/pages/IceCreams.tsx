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
  useColorMode,
} from "@chakra-ui/react";
import IceCreamTile from "../components/IceCreams/IceCreamTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { IceCream } from "../models/IceCream";
import Nav from "../components/Nav/Nav";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Pagination, PaginationProps, theme } from "antd";
import IceCreamTileSkeleton from "../components/IceCreams/IceCreamTileSkeleton";
import { Path } from "./Paths";
import { Helmet } from "react-helmet";

const IceCreams = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { t } = useTranslation();

  const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const [searchField, setSearchField] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [sorting, setSorting] = useState<number>(-2);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntities, setTotalEntities] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .post("/ice-creams", {
          searchField: searchField,
          isVegan: isVegan,
          sortKey: Number(sorting),
          page: currentPage,
        })
        .then((response) => {
          setIceCream(response.data.iceCreams);
          setTotalEntities(response.data.meta.queryEntitiesCount);
          setLoading(false);
        });
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [searchField, isVegan, sorting, currentPage]);

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
      <Helmet>
        <title>{t("ice-cream")}</title>
        <meta name="description" content="Przegląd Lodów" />
      </Helmet>
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
            <option value={-2}>{t("most-popular")}</option>
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

        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((fakeIceCream) => (
              <IceCreamTileSkeleton key={fakeIceCream} />
            ))}
          </>
        ) : (
          <>
            {iceCream.map((icecream, index) => (
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
                  href={`${Path.ICE_CREAMS}/${icecream.name_pl}-${icecream.brand_pl}/${icecream._id}`}
                  isVegan={icecream.vegan!}
                />
              </GridItem>
            ))}
          </>
        )}
      </Grid>
      <Center my={4}>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
        >
          <Pagination
            current={currentPage}
            onChange={onChange}
            pageSize={20}
            total={totalEntities}
            showSizeChanger={false}
          />
        </ConfigProvider>
      </Center>
    </>
  );
};

export default IceCreams;
