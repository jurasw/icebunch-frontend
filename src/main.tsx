import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { theme } from "./theme";


axios.defaults.baseURL = "https://icebackend.bieda.it/";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="670451075307-2g5qk2533aance5c2pbfvtvei4n9cl1d.apps.googleusercontent.com">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', isClosable: true, duration: 3000}}}>
          <Router />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
