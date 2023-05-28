import { Link, Grid } from "@chakra-ui/react";
import { Nav, UserNav } from "../components/Nav";
import IceCreamTile from "../components/IceCream/IceCreamTile";
import { useEffect, useState } from "react";
import axios from "axios";
import { IceCream } from "../models/IceCream";
import { useAuthStore } from "../zustand";

const Home = () => {
  const [iceCream, setIceCream] = useState<IceCream[]>([]);
  const user = useAuthStore((state) => state.user);

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
  }, []);

  return (
    <>
      {user ? <UserNav /> : <Nav />}
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
          <Link
            key={index}
            p={1}
            href={`/${icecream.name_pl}-${icecream.brand_pl}/${icecream._id}`}
          >
            <IceCreamTile
              name={icecream.name_pl}
              imageURL={icecream.image}
              rating={icecream.rating}
            />
          </Link>
        ))}
      </Grid>
    </>
  );
};

export default Home;
