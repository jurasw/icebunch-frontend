import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { theme } from "./theme";
import './i18n';
// import { I18nextProvider } from 'react-i18next';
// import i18n from 'i18next';
// import en from './locales/en.json'
// import pl from './locales/pl.json'
// import { initReactI18next } from 'react-i18next';
// import login_pl from './locales/Login/login_pl.json'
// import login_en from './locales/Login/login_en.json'

// import LanguageDetector from 'i18next-browser-languagedetector';


// i18n.use(initReactI18next).init({
//   // lng: 'en', // Set the default language
//   // lng: localStorage.getItem(key) || '',
//   fallbackLng: 'en', // Fallback language if a translation is missing
//   resources: {
//     en: {
//       translation: en // Import English translations
//     },
//     pl: {
//       translation: pl // Import French translations
//     }
//   },
//   debug: true
// });


axios.defaults.baseURL = "https://icebackend.bieda.it/";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="670451075307-2g5qk2533aance5c2pbfvtvei4n9cl1d.apps.googleusercontent.com">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      {/* <I18nextProvider i18n={i18n}> */}
        <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top', isClosable: true, duration: 3000}}}>
          <Router />
        </ChakraProvider>
    {/* </I18nextProvider>  */}
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
