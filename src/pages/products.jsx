import React, { useState } from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import ShopBreadcrumb from "@/components/breadcrumb/shop-breadcrumb";
import ShopArea from "@/components/shop/shop-area";
import ErrorMsg from "@/components/common/error-msg";
import Footer from "@/layout/footers/footer";
import ShopFilterOffCanvas from "@/components/common/shop-filter-offcanvas";
import ShopLoader from "@/components/loader/shop/shop-loader";
import client from "@/graphql/apollo-client";
import Header from "@/layout/headers/header";
import { CATEGORIES_LIST, SUB_CATEGORIES_LIST } from "@/graphql/query/shop";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { useRouter } from "next/router"; // Import the useRouter hook
import { ALL_BRANDS_DATA } from "@/graphql/query/brands";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

const ShopPage = ({
  productss,
  category,
  subCategories,
  footerLinks,
  brands,
}) => {
  const [currPage, setCurrPage] = useState(1);

  let product_items = productss;

  const otherProps = {
    currPage,
    setCurrPage,
  };
  let content = null;
  if (!productss || productss.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  } else {
    product_items = productss;


    content = (
      <>
        <ShopArea
          all_products={productss}
          products={product_items}
          otherProps={otherProps}
          categories={category}
          subCategories={subCategories}
          all_brands={brands}
        />
        {/* <ShopFilterOffCanvas
          all_products={productss}
          otherProps={otherProps}
          categories={category}
          subCategories={subCategories}
        /> */}
      </>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <Header categories={category} />
      <ShopBreadcrumb title="Shop Grid" subtitle="Shop Grid" />
      {content}
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export const getServerSideProps = async (context) => {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 100,
          },
          sort: "updatedAt:desc"
        },
      }),
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            limit: 1000,
          },
        },
      }),
      client.query({
        query: SUB_CATEGORIES_LIST,
        variables: {
          pagination: {
            limit: 1000,
          },
        },
      }),
      client.query({
        query: ALL_BRANDS_DATA,
        variables: {
          title: context.query.id,
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const productss = response[0]?.data?.products?.data;
    const category = response[1]?.data?.categories?.data;
    const subCategories = response[2]?.data?.subCategories?.data;
    const brands = response[3]?.data?.brands?.data;
    const footerLinks = response[4]?.data?.socialMedia?.data;
    if (response) {
      return {
        props: {
          productss,
          category,
          messages,
          subCategories,
          brands,
          footerLinks,
        },
      };
    } else {
      console.log("error");
      return { props: { error: true, messages } };
    }
  } catch (error) {
    console.log("error", error);
    return { props: { error: true, messages } };
  }
};

export default ShopPage;
