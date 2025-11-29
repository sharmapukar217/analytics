/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(input: { native: { username: $username, password: $password } }) {\n      __typename\n      ... on CurrentUser {\n        identifier\n      }\n      ...on ErrorResult {\n        message\n      }\n      ...on InvalidCredentialsError {\n        message\n      }\n    }\n  }\n": typeof types.AuthenticateDocument;
  "\n\tquery Analytics($days: Int) {\n\t  analytics(days: $days) {\n\t    totalUsers\n\t    totalSales\n\t    totalOrders {\n\t      active\n\t      pending\n\t      completed\n\t      cancelled\n\t    }\n\t    usersByMonth {\n\t      month\n\t      value\n\t    }\n\t    salesByMonth {\n\t      month\n\t      value\n\t    }\n\t    ordersByMonth {\n\t      month\n\t      value\n\t    }\n\t    todaysSales {\n\t      total\n\t      orders {\n\t        active\n\t        pending\n\t        completed\n\t        cancelled\n\t      }\n\t    }\n\t    weeklySales {\n\t      day\n\t      date\n\t      value\n\t    }\n\t    overallSalesReport {\n\t      all\n\t      completed\n\t    }\n\t  }\n\t}\n": typeof types.AnalyticsDocument;
};
const documents: Documents = {
  "\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(input: { native: { username: $username, password: $password } }) {\n      __typename\n      ... on CurrentUser {\n        identifier\n      }\n      ...on ErrorResult {\n        message\n      }\n      ...on InvalidCredentialsError {\n        message\n      }\n    }\n  }\n":
    types.AuthenticateDocument,
  "\n\tquery Analytics($days: Int) {\n\t  analytics(days: $days) {\n\t    totalUsers\n\t    totalSales\n\t    totalOrders {\n\t      active\n\t      pending\n\t      completed\n\t      cancelled\n\t    }\n\t    usersByMonth {\n\t      month\n\t      value\n\t    }\n\t    salesByMonth {\n\t      month\n\t      value\n\t    }\n\t    ordersByMonth {\n\t      month\n\t      value\n\t    }\n\t    todaysSales {\n\t      total\n\t      orders {\n\t        active\n\t        pending\n\t        completed\n\t        cancelled\n\t      }\n\t    }\n\t    weeklySales {\n\t      day\n\t      date\n\t      value\n\t    }\n\t    overallSalesReport {\n\t      all\n\t      completed\n\t    }\n\t  }\n\t}\n":
    types.AnalyticsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(input: { native: { username: $username, password: $password } }) {\n      __typename\n      ... on CurrentUser {\n        identifier\n      }\n      ...on ErrorResult {\n        message\n      }\n      ...on InvalidCredentialsError {\n        message\n      }\n    }\n  }\n",
): (typeof documents)["\n  mutation Authenticate($username: String!, $password: String!) {\n    authenticate(input: { native: { username: $username, password: $password } }) {\n      __typename\n      ... on CurrentUser {\n        identifier\n      }\n      ...on ErrorResult {\n        message\n      }\n      ...on InvalidCredentialsError {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n\tquery Analytics($days: Int) {\n\t  analytics(days: $days) {\n\t    totalUsers\n\t    totalSales\n\t    totalOrders {\n\t      active\n\t      pending\n\t      completed\n\t      cancelled\n\t    }\n\t    usersByMonth {\n\t      month\n\t      value\n\t    }\n\t    salesByMonth {\n\t      month\n\t      value\n\t    }\n\t    ordersByMonth {\n\t      month\n\t      value\n\t    }\n\t    todaysSales {\n\t      total\n\t      orders {\n\t        active\n\t        pending\n\t        completed\n\t        cancelled\n\t      }\n\t    }\n\t    weeklySales {\n\t      day\n\t      date\n\t      value\n\t    }\n\t    overallSalesReport {\n\t      all\n\t      completed\n\t    }\n\t  }\n\t}\n",
): (typeof documents)["\n\tquery Analytics($days: Int) {\n\t  analytics(days: $days) {\n\t    totalUsers\n\t    totalSales\n\t    totalOrders {\n\t      active\n\t      pending\n\t      completed\n\t      cancelled\n\t    }\n\t    usersByMonth {\n\t      month\n\t      value\n\t    }\n\t    salesByMonth {\n\t      month\n\t      value\n\t    }\n\t    ordersByMonth {\n\t      month\n\t      value\n\t    }\n\t    todaysSales {\n\t      total\n\t      orders {\n\t        active\n\t        pending\n\t        completed\n\t        cancelled\n\t      }\n\t    }\n\t    weeklySales {\n\t      day\n\t      date\n\t      value\n\t    }\n\t    overallSalesReport {\n\t      all\n\t      completed\n\t    }\n\t  }\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
