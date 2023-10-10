import { gql } from "@apollo/client";

export const SCORES_DATA = gql`
  query {
    scores {
      data {
        attributes {
          number
          title
        }
      }
    }
  }
`;

export const CATEGORIES_LIST = gql`
  query ($pagination: PaginationArg) {
    categories(pagination: $pagination) {
      data {
        id
        attributes {
          name
          logo {
            data {
              id
              attributes {
                url
              }
            }
          }
          sub_categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;