import { Grid, Input, Center, FormControl, FormLabel, Switch, Select, HStack, GridItem } from "@chakra-ui/react";
import { Nav, UserNav } from "../components/Nav";
// import { SearchIcon } from "@chakra-ui/icons";
import IceCreamTile from "../components/IceCream/IceCreamTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";

const Home = () => {
  const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const user = useAuthStore((state) => state.user);
  const [searchField, setSearchField] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [sorting, setSorting] = useState<number>(-1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/ice-creams", {
        searchField: searchField,
        isVegan: isVegan,
        sortKey: Number(sorting),
        page: 1,
      });
      setIceCream(result.data);
    };
    fetchData();
  }, [searchField, isVegan, sorting]);

  function handleSearchChange(event: any) {
    setSearchField(event.target.value)
  }

  function handleSortingChange(event: any) {
    setSorting(event.target.value)
    console.log(sorting)
    console.log(typeof(sorting))
  }

  return (
    <>
      {user ? <UserNav /> : <Nav />}
      <Center>
        <Input onChange={handleSearchChange} marginTop={'1.5rem'} justifySelf={"center"} width={{sm: "60%", xl: "40%"}} placeholder='Search...' size='lg' />
      </Center>
      <Center margin={'1rem'}>
        <HStack>
        <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='vegan-form'  mb='0'>
          Only Vegan
        </FormLabel>
        <Switch onChange={() => {setIsVegan(!isVegan)}} id='vegan' />
        </FormControl>
        <Select minW={"190px"} onChange={handleSortingChange}>
        <option value={-1}>Rating Decreasing</option>
        <option value={1}>Rating Increasing</option>

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
          <GridItem
          >
          <IceCreamTile
            key={index}
            name={icecream.name_pl}
            brand={icecream.brand_pl}
            imageURL={icecream.image}
            rating={icecream.rating}
            number_of_ratings={icecream.number_of_ratings}
            href={`/${icecream.name_pl}-${icecream.brand_pl}/${icecream._id}`}
          />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default Home;
