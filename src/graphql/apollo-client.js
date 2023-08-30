import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  uri: "https://cn.liveurdunews.com/graphql",

  cache: new InMemoryCache(),
});
export default client;
const uploadLink = createUploadLink({
  uri: "https://cn.liveurdunews.com/graphql",
});
export const uploadFileClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
export const apiConfig = {
  baseUrlMedia: "https://cn.liveurdunews.com",
  baseUrl: "https://cn.liveurdunews.com/graphql",
  UPLOAD_FILE: "/api/upload",
};
