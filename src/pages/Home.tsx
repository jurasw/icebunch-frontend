import { Box, Grid } from "@chakra-ui/react";
import Nav from "../components/Nav";
import IceCreamTile from "../components/IceCream/IceCreamTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { IceCream } from "../models/IceCream";

const Home = () => {
  const [iceCream, setIceCream] = useState<IceCream[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post("/ice-creams", {
        searchField: "",
        isVegan: false,
        sortKey: -1,
        page: 1,
      });
      setIceCream(result.data);
    };

    fetchData();
  });

  return (
    <>
      <Nav />
      <Grid
        maxW={"100%"}
        w={"100%"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={2}
      >
        {/* Grid items */}
        {iceCream.map((icecream, index) => (
          <Box key={index} p={1}>
            <IceCreamTile
              name={icecream.name_pl}
              imageURL={icecream.image}
              rating={icecream.rating}
            />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default Home;
