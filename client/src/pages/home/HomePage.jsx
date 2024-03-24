import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import { useEffect } from "react";
import { settings } from "../../config";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";


const HomePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0 });

  }, []);

  useEffect(() => {

    settings.isUnderConstruction && toast(t("alerts.underConstruction"), {
      icon: '🚧'
    }),
      !settings.isDbConnected && toast(t("alerts.dbNotConnected"), {
        icon: '🚫'
      }),
      [settings.underConstruction, settings.db]
  })




  return (
    <MainLayout>
      <Hero />
      <Articles />
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
