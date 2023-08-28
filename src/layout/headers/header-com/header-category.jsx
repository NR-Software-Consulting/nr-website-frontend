import React from "react";
import { useRouter } from "next/router";
import ErrorMsg from "@/components/common/error-msg";
import Loader from "@/components/loader/loader";

const HeaderCategory = ({
  isCategoryActive,
  toggleCategoryDropdown,
  categories,
  isError,
  isLoading,
}) => {
  const router = useRouter();

  const handleCategoryRoute = (categoryId, subCategoryId) => {
    let queryParams = ``;

    if (categoryId) {
      queryParams += `&categoryId=${categoryId}`;
    }

    if (subCategoryId) {
      queryParams += `&subCategoryId=${subCategoryId}`;
    }
    toggleCategoryDropdown();
    router.push(`/products?${queryParams}`);
  };

  let content = null;
  if (isLoading) {
    content = (
      <div className="py-5">
        <Loader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = <ErrorMsg msg="There was an error" />;
  } else if (categories?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  } else {
    content = categories?.map((item, index) => (
      <li className="has-dropdown" key={`${item.id}-${index}`}>
        <a
          className="cursor-pointer"
          onClick={() => handleCategoryRoute(item.id)}
        >
          {item?.attributes?.logo?.data?.attributes?.url && (
            <span>
              <img
                src={item?.attributes?.logo?.data?.attributes?.url}
                alt="category img"
                width={50}
                height={50}
              />
            </span>
          )}
          {item?.attributes?.name}
        </a>
        {item?.attributes?.sub_categories?.data && (
          <ul className="tp-submenu">
            {item?.attributes?.sub_categories?.data?.map(
              (subItem, subIndex) => (
                <li
                  key={`${subItem.id}-${subIndex}`}
                  onClick={() => handleCategoryRoute(item.id, subItem.id)}
                >
                  <a className="cursor-pointer">{subItem?.attributes?.name}</a>
                </li>
              )
            )}
          </ul>
        )}
      </li>
    ));
  }

  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;
