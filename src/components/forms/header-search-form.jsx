import { useState } from "react";
// internal
import { Search } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import useSearchFormSubmit from "@/hooks/use-search-form-submit";
import { useTranslations } from "next-intl";

const HeaderSearchForm = ({ categoriesList }) => {
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();
  const t = useTranslations("header");
  // selectHandle
  const selectCategoryHandle = (e) => {
    setCategory(e.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tp-header-search-wrapper d-flex align-items-center">
        <div className="tp-header-search-box">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder={t("Search for Products")}
          />
        </div>
        {/* <div className="tp-header-search-category">
          <NiceSelect
            options={categoriesList}
            defaultCurrent={0}
            onChange={selectCategoryHandle}
            name={t("Select Category")}
            placeholder={t("Select Category")}
          />
        </div> */}
        <div className="tp-header-search-btn">
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchForm;
