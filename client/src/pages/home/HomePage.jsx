import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import { useEffect } from "react";


const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);


  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
