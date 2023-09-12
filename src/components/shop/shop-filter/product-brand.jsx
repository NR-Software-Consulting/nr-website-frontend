
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import ErrorMsg from "@/components/common/error-msg";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopBrandLoader from "@/components/loader/shop/shop-brand-loader";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";

const ProductBrand = ({ setCurrPage, shop_right = false, all_brands, selectedBrands, handleBrandFilter }) => {
  const t = useTranslations("header");
  const { data, loading, error } = useQuery(ALL_BRANDS_DATA)
  const [localSelectedBrands, setLocalSelectedBrands] = useState([]);
  useEffect(() => {
    setLocalSelectedBrands(selectedBrands);
  }, [selectedBrands]);
  const handleCheckboxChange = (brandId) => {
    const updatedSelectedBrands = localSelectedBrands.includes(brandId)
      ? localSelectedBrands.filter((id) => id !== brandId)
      : [...localSelectedBrands, brandId];
    setLocalSelectedBrands(updatedSelectedBrands);
    handleBrandFilter(updatedSelectedBrands);
  };
  let content = null;

  if (loading) {
    content = <ShopBrandLoader loading={true} />;
  } else if (all_brands?.length === 0) {
    content = <ErrorMsg msg="No Brands found!" />;
  } else {
    content = (
      <ul className="filter-items filter-checkbox">
        {all_brands?.map((b) => (
          <li key={b?.id} className="filter-item checkbox">
            <input
              type="checkbox"
              id={`brand-${b?.id}`}
              value={b?.id}
              checked={localSelectedBrands?.includes(b.id)}
              onChange={() => handleCheckboxChange(b.id)}
            /> <label
              className="form-check-label"
              htmlFor={`brand-${b.id}`}
            >
              {b?.attributes?.name}
            </label>

          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">{t("Popular Brands")}</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <div className="tp-shop-widget-checkbox">
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductBrand;

