import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { theme } from "./theme";
import './i18n';


axios.defaults.baseURL = "https://icebackend.bieda.it/";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="753040770269-inet4cgh5nlldd2o3hvgvei6tkvu84qh.apps.googleusercontent.com">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', isClosable: true, duration: 3000}}}>
          <Router />
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
