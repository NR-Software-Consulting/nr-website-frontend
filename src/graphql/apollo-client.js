import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const BaseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://admin.nrmobiles.com";
const client = new ApolloClient({
  uri: `${BaseURL}/graphql`,
  cache: new InMemoryCache(),
});
export default client;
const uploadLink = createUploadLink({
  uri: `${BaseURL}/graphql`,
});
export const uploadFileClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
export const apiConfig = {
  baseUrlMedia: `${BaseURL}`,
  baseUrl: `${BaseURL}/graphql`,
  UPLOAD_FILE: "/api/upload",
};
