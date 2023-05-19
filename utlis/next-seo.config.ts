import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  openGraph: {
    type: "Website",
    locale: "en_IE",
    url: "https://nrmobiles.com/",
    siteName: "NR Mobiles Officials",
    description:
      "Your one-stop destination for cutting-edge smartphones and accessories. Stay connected with the latest tech trends. Where Quality meets Affordability.",
    images: [
      {
        url: "/NRfavicon.jpeg",
        width: 800,
        height: 600,
        alt: "NR Mobiles Officials",
      },
      {
        url: "/NRfavicon.jpeg",
        width: 800,
        height: 600,
        alt: "NR Mobiles Officials",
      },
    ],
  },
  titleTemplate: "NR Mobiles Officials",
  defaultTitle: "NR Mobiles Officials",
  title: "NR Mobiles Officials",
  description:
    "Your one-stop destination for cutting-edge smartphones and accessories. Stay connected with the latest tech trends. Where Quality meets Affordability.",
  twitter: {
    handle: "@handle",
    site: "@Website",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "favicon",
      href: "public/NRfavicon.jpeg",
    },
    {
      rel: "icon",
      href: "/NRfavicon.jpeg",
      sizes: "76x76",
    },
  ],
  robotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: "standard",
    maxVideoPreview: -1,
  },
  canonical: "https://nrmobiles.com/",
  additionalMetaTags: [
    {
      property: "",
      content: "",
    },
    {
      name: "",
      content: "",
    },
  ],
};

export default config;

export const mapSeoData = (data: any) => {
  return {
    titleTemplate: data?.titleMeta || config.titleTemplate,
    defaultTitle: data?.titleMeta || config.defaultTitle,
    title: data?.titleMeta || config.title,
    openGraph: {
      type: "Website",
      locale: "en_IE",
      url: data?.canonicalURL || config.canonical,
      siteName: data?.focuskeyphrase || config.title,
      title: data?.focuskeyphrase || config.title,
      description: data?.metaDescriptionmeta || config.openGraph?.description,
      article: {
        authors: [
          {
            url: data?.metaImage?.data?.attributes?.url,
            width: 800,
            height: 600,
            alt: "NR Mobiles Officials",
          },
          {
            url: data?.metaImage?.data?.attributes?.url,
            width: 800,
            height: 600,
            alt: "NR Mobiles Officials",
          },
        ],
      },
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "NR Mobiles Officials",
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "NR Mobiles Officials",
        },
      ],
    },
    additionalLinkTags: [
      {
        rel: "favicon",
        href: "/NRfavicon.jpeg",
      },
      {
        rel: "apple-touch-icon",
        href: "/NRfavicon.jpeg",
        sizes: "76x76",
      },
    ],
    description: data?.metaDescription || config.description,
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: data?.metaDescription || config.twitter?.cardType,
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "NR Mobiles Officials",
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "NR Mobiles Officials",
        },
      ],
    },

    canonical: data?.canonicalURL || config.canonical,
  };
};
