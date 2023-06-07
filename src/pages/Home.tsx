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
import axios from "axios";
import { IceCream } from "../models/IceCream";
import Nav from "../components/Nav";
import { useTranslation } from "react-i18next";
import { Pagination, PaginationProps } from "antd";

const Home = () => {
  const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const [searchField, setSearchField] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [sorting, setSorting] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/ice-creams", {
        searchField: searchField,
        isVegan: isVegan,
        sortKey: Number(sorting),
        page: currentPage,
      });
      setIceCream(result.data.iceCreams);
      setTotal(result.data.total)
    };
    fetchData();
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
              href={`/${icecream.name_pl}-${icecream.brand_pl}/${icecream._id}`}
              isVegan={icecream.vegan!}
            />
          </GridItem>
        ))}
      </Grid>
      <Center my={4}>
        <Pagination current={currentPage} onChange={onChange} total={total} />
      </Center>
    </>
  );
};

export default Home;
