import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import Stats from "../components/LandingPage/Stats";
import Nav from "../components/Nav";

const LandingPage = () => {
  return (
    <>
      <Nav />

      <Hero />
      <Stats />
      <Features />

      <Footer />
    </>
  );
};

export default LandingPage;
