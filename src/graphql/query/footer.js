/** @format */

import { gql } from "@apollo/client";

export const SOCIAL_LINKS = gql`
  query {
    socialMedia {
      data {
        attributes {
          facebookUrl
          instagramUrl
          linkedInUrl
          pinterestUrl
          twitterUrl
          whatsappNumber
          youtubeUrl
        }
      }
    }
  }
`;
