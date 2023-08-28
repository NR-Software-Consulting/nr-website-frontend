/** @format */

import { gql } from "@apollo/client";

export const ALL_BRANDS_DATA = gql`
  query Brands {
    brands {
      data {
        id
        attributes {
          name
          logo {
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
