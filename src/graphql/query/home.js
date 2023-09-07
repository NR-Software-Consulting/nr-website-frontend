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

export const PRIVACY_POLICY = gql`
  query {
    privacyPolicy {
      data {
        attributes {
          title
          description
        }
      }
    }
  }
`;

export const TERMS_AND_CONDITION = gql`
  query {
    termsAndCondition {
      data {
        attributes {
          title
          description
        }
      }
    }
  }
`;
