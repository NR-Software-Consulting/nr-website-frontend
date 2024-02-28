import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx?.locale || "es" };
  }

  render() {
    return (
      <Html
        dir={this.props.locale === "ar" ? "rtl" : "ltr"}
        lang={this.props.locale}
      >
        <Head>
          <script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-WSBC9MMB");`,
            }}
          ></script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1682562140112029"
            crossorigin="anonymous"
          ></script>
          <meta
            name="google-site-verification"
            content="hWhMfE9cAI0NYuwOIr7Htc8sh7csM1dep9TY4R3_NVM"
          />
          <meta
            name="google-adsense-account"
            content="ca-pub-1682562140112029"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
