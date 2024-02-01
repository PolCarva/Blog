import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import toast from "react-hot-toast";

const HomePage = () => {
  toast("Site under construction. Some features may not work!", {
    icon: "🚧",
    duration: 10000,
    style: {
      background: "#333",
      color: "#fff",
    },
  });

  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
