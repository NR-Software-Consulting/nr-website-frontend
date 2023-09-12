

import React from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import ErrorMsg from "@/components/common/error-msg";
import CategoryListLoader from "@/components/loader/home/category-list-loader";

const CategoryFilter = ({
  categoriesList,
  handleCategoryFilter,
  handleSubCategoryFilter,
  selectedCategories,
  selectedSubCategories,
}) => {
  const t = useTranslations("header");
  const { data, loading, error } = useQuery(CATEGORIES_LIST)
  let content = null;
  if (!data) {
    content = <CategoryListLoader loading={true} />;
  } else if (data?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else {
    content = (
      <ul className="filter-items filter-checkbox">
        {categoriesList?.map((categoryItem) => (
          <li key={categoryItem?.id} className="filter-item checkbox">
            <input
              type="checkbox"
              id={`category-${categoryItem?.id}`}
              value={categoryItem?.id}
              checked={selectedCategories?.includes(categoryItem?.id)}
              onChange={() => handleCategoryFilter(categoryItem?.id, categoryItem?.attributes?.slug)}
            />
            <label
              className="form-check-label"
              htmlFor={`category-${categoryItem?.id}`}
            >
              {categoryItem?.attributes?.name}
            </label>
            {categoryItem?.attributes?.sub_categories?.data?.length > 0 && (
              <ul className="sub-category-list ms-5">
                {categoryItem.attributes?.sub_categories?.data?.map(
                  (subCategory) => (
                    <li key={subCategory?.id}>
                      <input
                        type="checkbox"
                        id={`subcategory-${subCategory?.id}`}
                        value={subCategory?.id}
                        checked={selectedSubCategories?.includes(subCategory?.id)}
                        onChange={() =>
                          handleSubCategoryFilter(subCategory?.id, categoryItem?.id, categoryItem?.attributes?.slug, subCategory?.attributes?.slug, null, categoryItem)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`subcategory-${subCategory?.id}`}
                      >
                        {subCategory?.attributes?.name}
                      </label>
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">{t("Categories")}</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-categories">
          <div className="tp-shop-widget-checkbox">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
