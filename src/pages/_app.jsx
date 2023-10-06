import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import "../styles/index.scss";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/apollo-client";
import { NextIntlClientProvider } from "next-intl";
import NextNProgress from "nextjs-progressbar";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}
if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

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
          <div id="root">
            <Component {...pageProps} />
          </div>
        </ApolloProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
