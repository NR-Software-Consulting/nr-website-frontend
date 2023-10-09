/** @format */

import { gql } from "@apollo/client";

export const PRODUCTS_DATA = gql`
  query (
    $pagination: PaginationArg
    $filters: ProductFiltersInput
    $sort: [String]
  ) {
    products(pagination: $pagination, filters: $filters, sort: $sort) {
      data {
        id
        attributes {
          slug
          title
          sku
          price
          description
          isTrending
          discount
          images {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
          publishedAt
          updatedAt
          brands {
            data {
              id
              attributes {
                name
              }
            }
          }
          category {
            data {
              id
              attributes {
                name
                slug
                brands {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                sub_categories {
                  data {
                    id
                    attributes {
                      slug
                      name
                    }
                  }
                }
              }
            }
          }
          sub_category {
            data {
              id
              attributes {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_DETAIL_DATA = gql`
  query ($pagination: PaginationArg, $filters: ProductFiltersInput) {
    products(pagination: $pagination, filters: $filters) {
      data {
        id
        attributes {
          title
          slug
          sku
          price
          discount
          isTrending
          description
          condition
          Colour {
            title
          }
          category {
            data {
              id
              attributes {
                name
                slug
              }
            }
          }
          images {
            data {
              attributes {
                url
              }
            }
          }
          brands {
            data {
              attributes {
                name
              }
            }
          }
          sub_category {
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
