// import React from "react";
// import { useRouter } from "next/router";
// import ErrorMsg from "@/components/common/error-msg";
// import Loader from "@/components/loader/loader";

// const HeaderCategory = ({
//   isCategoryActive,
//   toggleCategoryDropdown,
//   categories,
//   isError,
//   isLoading,
// }) => {
//   const router = useRouter();

//   const handleCategoryRoute = (categoryId, subCategoryId) => {
//     let queryParams = ``;

//     if (categoryId) {
//       queryParams += `&categoryId=${categoryId}`;
//     }

//     if (subCategoryId) {
//       queryParams += `&subCategoryId=${subCategoryId}`;
//     }
//     toggleCategoryDropdown();
//     router.push(`/products?${queryParams}`);
//   };

//   let content = null;
//   if (isLoading) {
//     content = (
//       <div className="py-5">
//         <Loader loading={isLoading} />
//       </div>
//     );
//   } else if (isError) {
//     content = <ErrorMsg msg="There was an error" />;
//   } else if (categories?.length === 0) {
//     content = <ErrorMsg msg="No Category found!" />;
//   } else {
//     content = categories?.map((item, index) => (
//       <li className="has-dropdown" key={`${item.id}-${index}`}>
//         <a
//           className="cursor-pointer"
//           onClick={() => handleCategoryRoute(item.id)}
//         >
//           {item?.attributes?.logo?.data?.attributes?.url && (
//             <span>
//               <img
//                 src={item?.attributes?.logo?.data?.attributes?.url}
//                 alt="category img"
//                 width={50}
//                 height={50}
//               />
//             </span>
//           )}
//           {item?.attributes?.name}
//         </a>
//         {item?.attributes?.sub_categories?.data && (
//           <ul className="tp-submenu">
//             {item?.attributes?.sub_categories?.data?.map(
//               (subItem, subIndex) => (
//                 <li
//                   key={`${subItem.id}-${subIndex}`}
//                   onClick={() => handleCategoryRoute(item.id, subItem.id)}
//                 >
//                   <a className="cursor-pointer">{subItem?.attributes?.name}</a>
//                 </li>
//               )
//             )}
//           </ul>
//         )}
//       </li>
//     ));
//   }

//   return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
// };

// export default HeaderCategory;

// with Pagination

import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items to display per page

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

  const loadMoreCategories = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const loadPreviousCategories = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(categories?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCategoriesData = categories?.slice(startIndex, endIndex);

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
    content = visibleCategoriesData?.map((item, index) => (
      <li className="has-dropdown" key={`${item.id}-${index}`} style={{ direction: "ltr", textAlign: "start" }}>
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
          {item?.attributes?.name?.length > 20 ? item?.attributes?.name?.slice(0, 20) + "..." : item?.attributes?.name}
        </a>
        {item?.attributes?.sub_categories?.data && (
          <ul className="tp-submenu">
            {item?.attributes?.sub_categories?.data?.map(
              (subItem, subIndex) => (
                <li
                  key={`${subItem?.id}-${subIndex}`}
                  onClick={() => handleCategoryRoute(item?.id, subItem?.id)}
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

  const paginationControls = (
    <div className="pagination-controls d-flex justify-content-evenly my-3" style={{ direction: "ltr" }}>
      <button
        style={{ paddingInline: "12px" }}
        onClick={loadPreviousCategories}
        className={`btn btn-sm btn-primary rounded-circle ${currentPage === 1 ? "disabled" : ""}`}
        disabled={currentPage === 1}
      >
        <i className="fa fa-angle-left"></i>
      </button>
      <button
        style={{ paddingInline: "12px" }}
        className="btn btn-sm btn-primary rounded-circle"
      >
        {currentPage}
      </button>
      <button
        style={{ paddingInline: "12px" }}
        onClick={loadMoreCategories}
        className={`btn btn-sm btn-primary  rounded-circle ${currentPage === totalPages ? "disabled" : ""}`}
        disabled={currentPage === totalPages}
      >
        <i className="fa fa-angle-right"></i>
      </button>
    </div>
  );

  content?.push(
    <li key="pagination-controls-dropdown">
      <div className="dropdown-pagination">{paginationControls}</div>
    </li>
  );

  return <ul className={isCategoryActive ? "active" : ""}>{content}</ul>;
};

export default HeaderCategory;

