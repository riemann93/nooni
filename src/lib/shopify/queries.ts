/**
 * GraphQL queries for the Shopify Storefront API.
 *
 * Each query is a tagged template literal so editors with GraphQL
 * plugins can syntax-highlight them. The /* GraphQL *\/ comment is
 * the convention many tools (Apollo, GraphQL.js, VSCode plugins)
 * recognise for inline highlighting.
 */

export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      images(first: 4) {
        nodes {
          url
          altText
          width
          height
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
        }
      }
    }
  }
`;
