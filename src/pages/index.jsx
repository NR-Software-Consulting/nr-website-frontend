import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import Header from "@/layout/headers/header";
import HomeHeroSlider from "@/components/hero-banner/home-hero-slider";
import ProductArea from "@/components/products/product-area";
import NewArrivals from "@/components/products/new-arrivals";
// import CtaArea from "@/components/cta/cta-area";
import Footer from "@/layout/footers/footer";
import AboutPage from "@/components/about-us/about";
import Accessories from "@/components/products/accessories";
import Scores from "@/components/scores/scores";
import Testimonials from "@/components/testimonials/testimonials";
// import HomeButtons from "@/components/homeButton/homeButtons";
import client from "@/graphql/apollo-client";
import { ABOUT_US_DATA } from "@/graphql/query/about";
import { PRODUCTS_DATA } from "@/graphql/query/products";
import { CATEGORIES_LIST, SCORES_DATA } from "@/graphql/query/home";
import { SOCIAL_LINKS } from "@/graphql/query/footer";

export default function Home(props) {
  const {
    about,
    newarrival,
    trending,
    accessories,
    scores,
    category,
    footerLinks,
  } = props;
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p style={{ fontSize: "48px" }}>Coming Soon</p>
      </div>
      {/*<SEO pageTitle="Home" />
      <Header categories={category} />
      <HomeHeroSlider />
      <Scores scores={scores} />
      <Testimonials />
      <NewArrivals products={newarrival} />
      <ProductArea products={trending} />
      <Accessories products={accessories} />
      <Footer socialLinks={footerLinks} />
      */}
    </Wrapper>
  );
}

export async function getStaticProps(context) {
  let messages = (await import(`../../messages/${context.locale}.json`))
    .default;
  try {
    const queries = [
      client.query({
        query: ABOUT_US_DATA,
      }),
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
    const about = response[0]?.data?.aboutUs?.data;
    const scores = response[1]?.data?.scores?.data;
    const category = response[2]?.data?.categories?.data;
    const newarrival = response[3]?.data?.products?.data;
    const trending = response[4]?.data?.products?.data;
    const accessories = response[5]?.data?.products?.data;
    const footerLinks = response[6]?.data?.socialMedia?.data;
    if (response) {
      return {
        props: {
          about,
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
