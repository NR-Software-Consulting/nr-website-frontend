import AboutDetail from "@/components/about-us/aboutDetail";
import SEO from "@/components/seo";
import client from "@/graphql/apollo-client";
import { ABOUT_US_DATA } from "@/graphql/query/about";
import { SOCIAL_LINKS } from "@/graphql/query/footer";
import { CATEGORIES_LIST } from "@/graphql/query/home";
import Footer from "@/layout/footers/footer";
import Header from "@/layout/headers/header";
import Wrapper from "@/layout/wrapper";
import React from "react";

const About = (props) => {
  const { about, footerLinks, category } = props;
  return (
    <Wrapper>
      <SEO pageTitle="About" />
      <Header categories={category} />
      <AboutDetail {...about} />
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
};
export async function getStaticProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: ABOUT_US_DATA,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
      client.query({
        query: CATEGORIES_LIST,
      }),
    ];
    const response = await Promise.all(queries);
    const about = response[0]?.data?.aboutUs?.data;
    const footerLinks = response[1]?.data?.socialMedia?.data;
    const category = response[2]?.data?.categories?.data;
    if (response) {
      return {
        props: {
          about,
          footerLinks,
          category,
          messages,
        },
      };
    } else {
      return { props: { error: true, messages } };
    }
  } catch (error) {
    return { props: { error: true, messages } };
  }
}
export default About;
