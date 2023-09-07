import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { PRIVACY_POLICY } from "@/graphql/query/home";
import { CATEGORIES_LIST } from "@/graphql/query/shop";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const PrivacyPolicy = ({ category, footerLinks, privacyPolicy }) => {
  return (
    <Wrapper>
      <SEO pageTitle={privacyPolicy?.attributes?.title} />
      <Header categories={category} />
      <CommonBreadcrumb
        title={privacyPolicy?.attributes?.title}
        subtitle={privacyPolicy?.attributes?.title}
      />
      <section className="tp-error-area pt-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <ReactMarkdown
                children={privacyPolicy?.attributes?.description}
                remarkPlugins={[remarkGfm]}
                className="markdown"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};

export default PrivacyPolicy;
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
      client.query({
        query: PRIVACY_POLICY,
      }),
    ];
    const response = await Promise.all(queries);
    const category = response[0]?.data?.categories?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const privacyPolicy = response[2]?.data?.privacyPolicy?.data;

    if (response) {
      return {
        props: {
          category,
          messages,
          footerLinks,
          privacyPolicy,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
