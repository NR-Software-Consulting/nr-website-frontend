import React, { useEffect, useState } from "react";
import Pagination from "@/ui/Pagination";
import ProductItem from "../products/product-item";
import CategoryFilter from "./shop-filter/category-filter";
import ColorFilter from "./shop-filter/color-filter";
import PriceFilter from "./shop-filter/price-filter";
import ProductBrand from "./shop-filter/product-brand";
import StatusFilter from "./shop-filter/status-filter";
import TopRatedProducts from "./shop-filter/top-rated-products";
import ShopListItem from "./shop-list-item";
import ShopTopLeft from "./shop-top-left";
import ShopTopRight from "./shop-top-right";
import ResetButton from "./shop-filter/reset-button";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { getCookie } from "cookies-next";
import ShopLoader from "../loader/shop/shop-loader";
import useLoadingState from "@/hooks/use-loading";
import SearchPrdLoader from "../loader/search-prd-loader";

const ShopArea = ({
  all_products: _all_products,
  products,
  otherProps,
  categories,
  subCategories,
  all_brands,
}) => {
  const { currPage, setCurrPage } = otherProps;
  const router = useRouter();
  const [searchProducts, { loading, error, data }] =
    useLazyQuery(PRODUCTS_DATA);
  const isLoading = useLoadingState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [all_products, setAllProducts] = useState(_all_products);
  const [filteredRows, setFilteredRows] = useState(_all_products);
  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(12);
  const token = getCookie("token");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const maxPrice = products.reduce((max, product) => {
    const productPrice = product.attributes.price;
    return productPrice > max ? productPrice : max;
  }, 0);
  const [priceValue, setPriceValue] = useState([0, maxPrice]);

  // handleCategoryFilterfromheader

  useEffect(() => {
    const { categoryId, subCategoryId } = router.query;
    if (categoryId && subCategoryId) {
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      handleSubCategoryFilter(subCategoryId, categoryId, null, null, []);
    } else if (categoryId) {
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      handleCategoryFilter(categoryId, null, []);
    } else {
      setFilteredRows(all_products);
    }
  }, [router.query.categoryId, router.query.subCategoryId]);

  // handleCategoryFilter

  const handleCategoryFilter = async (
    categoryId,
    category,
    _selectedCategories
  ) => {
    try {
      let updatedCategories = _selectedCategories
        ? _selectedCategories
        : [...selectedCategories];
      let selectedSubs = [];
      if (updatedCategories.includes(categoryId)) {
        updatedCategories = updatedCategories.filter((id) => id !== categoryId);
        selectedSubs = [...selectedSubCategories];
        categories
          .find((item) => item.id === categoryId)
          .attributes.sub_categories.data.map((subCategory) => {
            selectedSubs = selectedSubs.filter(
              (item) => item !== subCategory?.id
            );
          });
      } else {
        updatedCategories.push(categoryId);
        selectedSubs = categories
          .find((item) => item.id === categoryId)
          .attributes.sub_categories.data.map((subCategory) => subCategory.id);
        selectedSubs = _selectedCategories
          ? selectedSubs
          : [...selectedSubCategories, ...selectedSubs];
      }
      setSelectedCategories(updatedCategories);
      setSelectedSubCategories(selectedSubs);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };

      if (selectedSubs.length > 0) {
        newData.variables.filters.sub_category = {
          id: {
            in: selectedSubs,
          },
        };
      }

      if (priceValue[0] > 0 || priceValue[1] < maxPrice) {
        newData.variables.filters.price = {
          between: [
            priceValue[0] == 0 ? priceValue[0] : priceValue[0] - 1,
            priceValue[1] + 1,
          ],
        };
      }
      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      if (selectValue === "Low to High") {
        newData.variables.sort = "price:asc";
      } else if (selectValue === "High to Low") {
        newData.variables.sort = "price:desc";
      } else if (selectValue === "Default Sorting") {
        newData.variables.sort = "updatedAt:desc";
      } else if (selectValue === "isTrending") {
        newData.variables.filters.isTrending = {
          eq: true,
        };
      }
      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const cateoryfilteredProducts = response.data.products.data;
        setAllProducts(cateoryfilteredProducts);
        const slugs = cateoryfilteredProducts
          .map((item) => item?.attributes?.slug)
          .filter(Boolean);
        const newUrl = `${router.pathname}?${slugs.join("&")}`;
        window.history.replaceState({}, "", newUrl);
        setFilteredRows(cateoryfilteredProducts);
        setCurrPage(1);
      } else {
        setFilteredRows(_all_products);
        setAllProducts(_all_products);
      }
      if (updatedCategories.length === 0) {
        const newUrl = router.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // subCategory Filter
  const handleSubCategoryFilter = async (
    subCategoryId,
    categoryId,
    category,
    subCategory,
    _selectedSubCategories,
    categoryItem
  ) => {
    try {
      let updatedSubCategories = _selectedSubCategories
        ? _selectedSubCategories
        : [...selectedSubCategories];
      if (
        updatedSubCategories &&
        updatedSubCategories.includes(subCategoryId)
      ) {
        updatedSubCategories = updatedSubCategories.filter(
          (id) => id !== subCategoryId
        );
      } else {
        updatedSubCategories.push(subCategoryId);
      }

      const _selectedCategories =
        categoryItem?.id == undefined ? [] : [...selectedCategories];
      if (
        categoryItem?.attributes?.sub_categories?.data?.filter((item) =>
          updatedSubCategories.includes(item?.id)
        )?.length == 0
      ) {
        setSelectedCategories(
          _selectedCategories.filter((item) => item !== categoryId)
        );
      } else {
        if (!_selectedCategories.includes(categoryId)) {
          setSelectedCategories(_selectedCategories.concat(categoryId));
        }
      }
      setSelectedSubCategories(updatedSubCategories);

      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };

      if (updatedSubCategories?.length > 0) {
        newData.variables.filters.sub_category = {
          id: {
            in: updatedSubCategories,
          },
        };
      }
      if (priceValue[0] > 0 || priceValue[1] < maxPrice) {
        newData.variables.filters.price = {
          between: [
            priceValue[0] == 0 ? priceValue[0] : priceValue[0] - 1,
            priceValue[1] + 1,
          ],
        };
      }
      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      if (selectValue === "Low to High") {
        newData.variables.sort = "price:asc";
      } else if (selectValue === "High to Low") {
        newData.variables.sort = "price:desc";
      } else if (selectValue === "Default Sorting") {
        newData.variables.sort = "updatedAt:desc";
      } else if (selectValue === "isTrending") {
        newData.variables.filters.isTrending = {
          eq: true,
        };
      }
      let response = await searchProducts(newData);

      if (response.data.products.data) {
        const subCateoryfilteredProducts = response.data.products.data;
        setAllProducts(subCateoryfilteredProducts);
        const slugs = subCateoryfilteredProducts
          .map((item) => item?.attributes?.slug)
          .filter(Boolean);
        const newUrl = `${router.pathname}?${slugs.join("&")}`;
        window.history.replaceState({}, "", newUrl);
        setFilteredRows(subCateoryfilteredProducts);
        setCurrPage(1);
      } else {
        setFilteredRows(_all_products);
        setAllProducts(_all_products);
      }
      if (updatedSubCategories.length === 0) {
        const newUrl = router.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle Price filter

  const handleChanges = (val) => {
    setPriceValue(val);
    // handlePriceFilter(val)
  };

  // handlePriceFilter
  const handlePriceFilter = async () => {
    try {
      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };
      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          id: {
            in: selectedSubCategories,
          },
        };
      }
      if (priceValue[0] > 0 || priceValue[1] < maxPrice) {
        newData.variables.filters.price = {
          between: [
            priceValue[0] == 0 ? priceValue[0] : priceValue[0] - 1,
            priceValue[1] + 1,
          ],
        };
      }
      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      if (selectValue === "Low to High") {
        newData.variables.sort = "price:asc";
      } else if (selectValue === "High to Low") {
        newData.variables.sort = "price:desc";
      } else if (selectValue === "Default Sorting") {
        newData.variables.sort = "updatedAt:desc";
      } else if (selectValue === "isTrending") {
        newData.variables.filters.isTrending = {
          eq: true,
        };
      }
      let response = await searchProducts(newData);

      if (response.data.products.data) {
        const pricefilteredProducts = response.data.products.data;
        setAllProducts(pricefilteredProducts);
        const newUrl = `${router.pathname}`;
        window.history.replaceState({}, "", newUrl);
        setFilteredRows(pricefilteredProducts);
        setCurrPage(1);
      } else {
        setFilteredRows(_all_products);
        setAllProducts(_all_products);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // handleBrandFilter

  const handleBrandFilter = async (selectedBrands) => {
    try {
      setSelectedBrands(selectedBrands);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };

      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          id: {
            in: selectedSubCategories,
          },
        };
      }

      if (priceValue[0] > 0 || priceValue[1] < maxPrice) {
        newData.variables.filters.price = {
          between: [
            priceValue[0] == 0 ? priceValue[0] : priceValue[0] - 1,
            priceValue[1] + 1,
          ],
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      if (selectValue === "Low to High") {
        newData.variables.sort = "price:asc";
      } else if (selectValue === "High to Low") {
        newData.variables.sort = "price:desc";
      } else if (selectValue === "Default Sorting") {
        newData.variables.sort = "updatedAt:desc";
      } else if (selectValue === "isTrending") {
        newData.variables.filters.isTrending = {
          eq: true,
        };
      }
      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const brandFilteredProducts = response.data.products.data;
        setAllProducts(brandFilteredProducts);
        const slugs = brandFilteredProducts
          .map((item) => item?.attributes?.slug)
          .filter(Boolean);
        const newUrl = `${router.pathname}?${slugs.join("&")}`;
        window.history.replaceState({}, "", newUrl);
        setFilteredRows(brandFilteredProducts);
        setCurrPage(1);
      } else {
        setFilteredRows(_all_products);
        setAllProducts(_all_products);
      }
      if (selectedBrands.length === 0) {
        const newUrl = router.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // handleSortingFilter
  const handleSortingFilter = async (selectValue) => {
    try {
      setSelectValue(selectValue);
      let newData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
        },
      };

      if (selectedSubCategories.length > 0) {
        newData.variables.filters.sub_category = {
          id: {
            in: selectedSubCategories,
          },
        };
      }

      if (priceValue[0] > 0 || priceValue[1] < maxPrice) {
        newData.variables.filters.price = {
          between: [
            priceValue[0] == 0 ? priceValue[0] : priceValue[0] - 1,
            priceValue[1] + 1,
          ],
        };
      }

      if (selectedBrands.length > 0) {
        newData.variables.filters.brands = {
          id: {
            in: selectedBrands,
          },
        };
      }
      if (selectValue === "Low to High") {
        newData.variables.sort = "price:asc";
      } else if (selectValue === "High to Low") {
        newData.variables.sort = "price:desc";
      } else if (selectValue === "Default Sorting") {
        newData.variables.sort = "updatedAt:desc";
      } else if (selectValue === "isTrending") {
        newData.variables.filters.isTrending = {
          eq: true,
        };
      }
      let response = await searchProducts(newData);
      if (response.data.products.data) {
        const SortingFilteredProducts = response.data.products.data;
        setAllProducts(SortingFilteredProducts);
        const slugs = SortingFilteredProducts.map(
          (item) => item?.attributes?.slug
        ).filter(Boolean);
        const newUrl = `${router.pathname}?${slugs.join("&")}`;
        window.history.replaceState({}, "", newUrl);
        setFilteredRows(SortingFilteredProducts);
        setCurrPage(1);
      } else {
        setFilteredRows(_all_products);
        setAllProducts(_all_products);
      }
      if (selectValue === "Default Sorting") {
        const newUrl = router.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Reset filter

  const handleResetFilters = async () => {
    try {
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      setPriceValue([0, maxPrice]);
      setSelectValue("Default Sorting");
      setSelectedBrands([]);

      const newUrl = `${router.pathname}`;
      window.history.replaceState({}, "", newUrl);

      const initialData = {
        variables: {
          filters: {},
          pagination: {
            limit: 100,
          },
          sort: "updatedAt:desc",
        },
      };

      let response = await searchProducts(initialData);

      if (response.data.products.data) {
        const initialProducts = response.data.products.data;
        setAllProducts(initialProducts);
        setFilteredRows(initialProducts);
        setCurrPage(1);
      } else {
        setFilteredRows([]);
        setAllProducts([]);
        const newUrl = `${router.pathname}`;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };

  // paginatedData

  const paginatedData = (items, startPage, pageCount) => {
    setFilteredRows(items);
    setPageStart(startPage);
    setCountOfPage(pageCount);
  };

  return (
    <>
      <section className="tp-shop-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <div className="tp-shop-sidebar mr-10">
                {/* filter */}
                <PriceFilter
                  priceValue={priceValue}
                  handleChanges={handleChanges}
                  maxPrice={maxPrice}
                  handleFilterClick={handlePriceFilter}
                />
                {/* status */}
                {/* <StatusFilter setCurrPage={setCurrPage} /> */}
                {/* categories */}
                <CategoryFilter
                  products={products}
                  categoriesList={categories}
                  subCategoriesList={subCategories}
                  handleCategoryFilter={handleCategoryFilter}
                  handleSubCategoryFilter={handleSubCategoryFilter}
                  selectedCategories={selectedCategories}
                  selectedSubCategories={selectedSubCategories}
                />
                {/* color */}
                {/* <ColorFilter
                  setCurrPage={setCurrPage}
                  subCategoriesList={subCategories}
                /> */}
                {/* product rating */}
                {/* <TopRatedProducts /> */}
                <ProductBrand
                  setCurrPage={setCurrPage}
                  all_brands={all_brands}
                  handleBrandFilter={handleBrandFilter}
                  selectedBrands={selectedBrands}
                />
                <ResetButton handleResetFilters={handleResetFilters} />
              </div>
            </div>
            <div className="col-xl-9 col-lg-8">
              {isLoading ? (
                <div>
                  <SearchPrdLoader />
                </div>
              ) : (
                <div className="tp-shop-main-wrapper">
                  <div className="tp-shop-top mb-45">
                    <div className="row">
                      <div className="col-xl-6">
                        <ShopTopLeft
                          showing={
                            products.length === 0
                              ? 0
                              : filteredRows.slice(
                                  pageStart,
                                  pageStart + countOfPage
                                ).length
                          }
                          total={all_products.length}
                        />
                      </div>
                      <div className="col-xl-6">
                        <ShopTopRight
                          handleSortingFilter={handleSortingFilter}
                          selectValue={selectValue}
                        />
                      </div>
                    </div>
                  </div>
                  {products.length === 0 || all_products.length === 0 ? (
                    <h2>No products found</h2>
                  ) : null}
                  {products.length > 0 && (
                    <div className="tp-shop-items-wrapper tp-shop-item-primary">
                      <div className="tab-content" id="productTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="grid-tab-pane"
                          role="tabpanel"
                          aria-labelledby="grid-tab"
                          tabIndex="0"
                        >
                          <div className="row">
                            {filteredRows
                              .slice(pageStart, pageStart + countOfPage)
                              .map((item, index) => (
                                <div
                                  key={`${item.id}-${index}`}
                                  className="col-xl-4 col-md-6 col-sm-6"
                                >
                                  <ProductItem product={item} />
                                </div>
                              ))}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="list-tab-pane"
                          role="tabpanel"
                          aria-labelledby="list-tab"
                          tabIndex="0"
                        >
                          <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                            <div className="row">
                              <div className="col-xl-12">
                                {filteredRows
                                  .slice(pageStart, pageStart + countOfPage)
                                  .map((item, index) => (
                                    <ShopListItem
                                      key={`${item.id}-${index}`}
                                      product={item}
                                    />
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {all_products.length > 0 ? (
                    <div className="tp-shop-pagination mt-20">
                      <div
                        className="tp-pagination d-flex justify-content-center"
                        style={{ direction: "ltr" }}
                      >
                        <Pagination
                          items={all_products}
                          countOfPage={countOfPage}
                          paginatedData={paginatedData}
                          currPage={currPage}
                          setCurrPage={setCurrPage}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopArea;
