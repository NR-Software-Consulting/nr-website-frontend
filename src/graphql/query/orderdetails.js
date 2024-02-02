/** @format */

import { gql } from "@apollo/client";

export const GET_ORDER_DETAIL = gql`
  query Order($orderId: ID) {
    order(id: $orderId) {
      data {
        attributes {
          Name
          status
          total
          publishedAt
          products {
            description
            price
            title
            productId
            imageUrl
            quantity
            discount
            colour
          }
          city
          country
          phoneNumber
          discount
          createdAt
          zipCode
          address
          email
        }
        id
      }
    }
  }
`;

export const GET_ALL_ORDERS = gql`
  query Orders($filters: OrderFiltersInput, $pagination: PaginationArg) {
    orders(filters: $filters, pagination: $pagination) {
      data {
        attributes {
          products {
            id
            sku
            title
            description
            price
            quantity
          }
          publishedAt
          total
          status
        }
        id
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
`;
