import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = "https://icebackend.bieda.it/";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
