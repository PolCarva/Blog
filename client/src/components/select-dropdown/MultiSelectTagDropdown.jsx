import React from "react";
import { useTranslation } from "react-i18next";
import AsyncSelect from "react-select/async";

const MultiSelectTagDropdown = ({
  defaultValue,
  loadOptions,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <AsyncSelect
      defaultValue={defaultValue}
      defaultOptions
      isMulti
      loadOptions={loadOptions}
      className="relative z-30"
      onChange={onChange}
      placeholder={t("admin.common.select")}
    />
  );
};

export default MultiSelectTagDropdown;
