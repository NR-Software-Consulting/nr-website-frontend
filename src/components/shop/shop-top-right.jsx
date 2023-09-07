
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Filter } from "@/svg";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";
import { useTranslations } from "next-intl";

const ShopTopRight = ({ handleSortingFilter, selectValue }) => {
  const t = useTranslations("header");
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("Default Sorting");

  useEffect(() => {
    setSelectedValue(selectValue);
  }, [selectValue]);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    handleSortingFilter(selectedValue);
  };

  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <select
          className="form-select shadow-none border rounded-0"
          value={selectedValue}
          onChange={handleSelectChange}
        >
          <option value="Default Sorting">{t("Default Sorting")}</option>
          <option value="Low to High">{t("Low to High")}</option>
          <option value="High to Low">{t("High to Low")}</option>
          <option value="isTrending">{t("New Arrival")}</option>
        </select>
      </div>
      {/* <div className="tp-shop-top-filter">
        <button
          onClick={() => dispatch(handleFilterSidebarOpen())}
          type="button"
          className="tp-filter-btn"
        >
          <span>
            <Filter />
          </span>{" "}
          {t("Filter")}
        </button>
      </div> */}
    </div>
  );
};

export default ShopTopRight;
