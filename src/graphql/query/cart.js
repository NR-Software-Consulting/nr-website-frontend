/** @format */

import { gql } from "@apollo/client";

export const GET_ALL_CART_PRODUCT = gql`
  query Carts($filters: CartFiltersInput) {
    carts(filters: $filters) {
      data {
        id
        attributes {
          product {
            data {
              id
              attributes {
                title
                discount
                isTrending
                description
                condition
                price
                sku
                images {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                slug
              }
            }
          }
          quantity
        }
      }
    }
  }
`;
