import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import Stats from "../components/LandingPage/Stats";
import Nav from "../components/Nav/Nav";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <>
    <Helmet>
        <title>{t('main-page')}</title>
        <meta name="description" content='Strona Główna' />

    </Helmet>
      <Nav />

      <Hero />
      <Stats />
      <Features />

      <Footer />
    </>
  );
};

export default LandingPage;
