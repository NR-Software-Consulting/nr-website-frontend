import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  uri: "https://admin.nrmobiles.com/graphql",

  cache: new InMemoryCache(),
});
export default client;
const uploadLink = createUploadLink({
  uri: "https://admin.nrmobiles.com/graphql",
});
export const uploadFileClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});
export const apiConfig = {
  baseUrlMedia: "https://admin.nrmobiles.com",
  baseUrl: "https://admin.nrmobiles.com/graphql",
  UPLOAD_FILE: "/api/upload",
};
