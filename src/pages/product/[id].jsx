import React from "react";
import SEO from "@/components/seo";
import Footer from "@/layout/footers/footer";
import Wrapper from "@/layout/wrapper";
import ErrorMsg from "@/components/common/error-msg";
import ProductDetailsBreadcrumb from "@/components/breadcrumb/product-details-breadcrumb";
import ProductDetailsArea from "@/components/product-details/product-details-area";
import PrdDetailsLoader from "@/components/loader/prd-details-loader";
import Header from "@/layout/headers/header";
import { PRODUCTS_DATA, PRODUCT_DETAIL_DATA } from "@/graphql/query/products";
import client from "@/graphql/apollo-client";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import RelatedProducts from "@/components/product-details/related-products";
import { useTranslations } from "next-intl";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

const ProductDetailsPage = (props) => {
  const t = useTranslations("header");
  const { product, products, isLoading, isError, category, footerLinks } =
    props;
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <div>
        <ProductDetailsBreadcrumb
          category={product[0]?.attributes?.category?.data?.attributes?.name}
          title={product[0]?.attributes?.title}
        />
        <ProductDetailsArea productItem={product} />
        {/*
      <section className="tp-related-product pt-95 pb-50">
          <div className="container">
            <div className="row">
              <div className="tp-section-title-wrapper-6 text-center mb-40">
                <span className="tp-section-title-pre-6">
                  {t("Next day Products")}
                </span>
                <h3 className="tp-section-title-6">{t("Related Products")}</h3>
              </div>
            </div>
            <div className="row">
              <RelatedProducts product={products} />
            </div>
          </div>
        </section>
      */}
      </div>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle={product[0]?.attributes?.title} />
      <Header categories={category} />
      {content}
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default ProductDetailsPage;
export const getServerSideProps = async (context) => {
  let messages = (await import(`../../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: PRODUCT_DETAIL_DATA,
        variables: {
          filters: {
            slug: {
              eq: context.query.id,
            },
          },
        },
      }),
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          filters: {
            category: {
              id: {
                eq: "25",
              },
            },
          },
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const product = response[0]?.data?.products?.data || [];
    const category = response[1]?.data?.categories?.data;
    const products = response[2]?.data?.products?.data;
    const footerLinks = response[3]?.data?.socialMedia?.data;
    if (response) {
      return {
        props: {
          product,
          category,
          products,
          messages,
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
