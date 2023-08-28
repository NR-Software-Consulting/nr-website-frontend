/** @format */

import { gql } from "@apollo/client";

export const CATEGORIES_LIST = gql`
  query( $pagination: PaginationArg) {
    categories(pagination: $pagination) {
      data {
        id
        attributes {
          name
          slug
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
                slug
              }
            }
          }
         
        }
      }
    }
  }
`;

export const SUB_CATEGORIES_LIST = gql`
  query SubCategories($pagination: PaginationArg,$filters: SubCategoryFiltersInput) {
    subCategories(pagination: $pagination,filters: $filters) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
