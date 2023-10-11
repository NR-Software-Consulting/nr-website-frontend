import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { NextIntlClientProvider } from "next-intl";
import NextNProgress from "nextjs-progressbar";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
export default function App({ Component, pageProps }) {
  return (
    <NextIntlClientProvider messages={pageProps.messages}>
      <Provider store={store}>
        <NextNProgress
          color="var(--tp-theme-primary)"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <ApolloProvider client={client}>
          {/*<Elements stripe={stripePromise}> */}
          <div id="root">
            <Component {...pageProps} />
          </div>
          {/*</Elements> */}
        </ApolloProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
