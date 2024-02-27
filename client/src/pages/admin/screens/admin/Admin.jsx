import React from "react";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5 w-svw h-[calc(100svh-3.25rem)] rounded-lg p-5 bg-primary justify-center">
      <h1 className="text-2xl md:text-6xl text-center text-white font-bold">{t("admin.dashboard.title")}</h1>
      <p className="text-center text-sm md:text-xl text-white md:w-2/3 mx-auto">
        {t("admin.dashboard.paragraph")}
      </p>
    </div>
  );
};

export default Admin;
