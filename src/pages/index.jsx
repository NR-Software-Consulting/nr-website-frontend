import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import ProductArea from "@/components/products/product-area";
import NewArrivals from "@/components/products/new-arrivals";
import Footer from "@/layout/footers/footer";
import Accessories from "@/components/products/accessories";
import Scores from "@/components/scores/scores";
import Testimonials from "@/components/testimonials/testimonials";
import client from "@/graphql/apollo-client";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { CATEGORIES_LIST, SCORES_DATA } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

export default function Home(props) {
  const { newarrival, trending, accessories, scores, category, footerLinks } =
    props;
  return (
    <Wrapper>
      <SEO pageTitle="NR Mobiles & Accessories Company" />
      <Header categories={category} />
      <HomeHeroSlider />
      <Scores scores={scores} />
      <Testimonials />
      <NewArrivals products={newarrival} />
      <ProductArea products={trending} />
      <Accessories products={accessories} />
      <Footer socialLinks={footerLinks} />
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: SCORES_DATA,
      }),
      client.query({
        query: CATEGORIES_LIST,
        variables: {
          pagination: {
            limit: 100,
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 12,
          },
          filters: {
            isTrending: {
              eq: true,
            },
          },
        },
      }),
      client.query({
        query: PRODUCTS_DATA,
        variables: {
          pagination: {
            limit: 10,
          },
        },
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];
    const response = await Promise.all(queries);
    const scores = response[0]?.data?.scores?.data;
    const category = response[1]?.data?.categories?.data;
    const newarrival = response[2]?.data?.products?.data;
    const trending = response[3]?.data?.products?.data;
    const accessories = response[4]?.data?.products?.data;
    const footerLinks = response[5]?.data?.socialMedia?.data;
    if (response) {
      return {
        props: {
          scores,
          category,
          newarrival,
          trending,
          accessories,
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
