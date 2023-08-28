/** @format */

import { gql } from "@apollo/client";

export const CONTACT_US_DATA = gql`
  query {
    contactUs {
      data {
        attributes {
          email
          phoneNumber
          Address
        }
      }
    }
  }
`;
