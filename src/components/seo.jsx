import Head from "next/head";

const SEO = ({ seoData, pageTitle }) => {
  return (
    <>
      <Head>
        <title>{pageTitle} - NR Mobiles Best E-commerce Store</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="description"
          content={
            "Explore NR Mobiles: Your Hub for the Latest Tech Gadgets & Accessories. Unbeatable Deals, Fast Shipping & Exceptional Service. Shop Now!"
          }
        />
        <meta name="title" content={pageTitle} />
        <meta
          name="robots"
          content={"index, follow, max-image-preview:large,"}
        />
        <meta name="keywords" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={
            "Explore NR Mobiles: Your Hub for the Latest Tech Gadgets & Accessories. Unbeatable Deals, Fast Shipping & Exceptional Service. Shop Now!"
          }
        />
        <meta property="og:url" content={"https://nrmobiles.com/"} />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/nr-mobiles.appspot.com/Image/NR_Image_ede2fcf097/NR_Image_ede2fcf097.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta
          name="twitter:description"
          content={
            "Explore NR Mobiles: Your Hub for the Latest Tech Gadgets & Accessories. Unbeatable Deals, Fast Shipping & Exceptional Service. Shop Now!"
          }
        />
        <meta
          name="twitter:image"
          content="https://storage.googleapis.com/nr-mobiles.appspot.com/Image/NR_Image_ede2fcf097/NR_Image_ede2fcf097.jpg"
        />
        <meta
          name="viewport"
          content={"width=device-width, initial-scale=1, maximum-scale=5"}
        />
        <meta name="author" content="NR Mobiles" />
        <meta name="publisher" content="NR Mobiles" />
        <link rel="canonical" href={"https://nrmobiles.com/"} />
        <link rel="icon" href="/favicon.png" />
      </Head>
    </>
  );
};

export default SEO;
