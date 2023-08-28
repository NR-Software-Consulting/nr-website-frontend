import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import MyOrders from "@/components/my-account/my-orders";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/shop";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import { useTranslations } from "next-intl";
import React from "react";

const Orders = ({ category, footerLinks }) => {
  const t = useTranslations("header");
  return (
    <Wrapper>
      <SEO pageTitle="My Orders" />
      <Header categories={category} />
      <CommonBreadcrumb title="My Orders" subtitle="My Orders" />
      <div className="pt-180 pb-180">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <MyOrders />
            </div>
          </div>
        </div>
      </div>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default Orders;
export async function getStaticProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: CATEGORIES_LIST,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;

    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
