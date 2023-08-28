import { gql } from "@apollo/client";

export const ABOUT_US_DATA = gql`
  query {
    aboutUs {
      data {
        attributes {
          title
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
