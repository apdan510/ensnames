import { gql } from '@apollo/client';

export const GET_DOMAINS = gql`
  query GetDomains($nameFilter: String!) {
    domains(where: { name_contains: $nameFilter }, first: 10) {
      id
      name
    }
  }
`;

export const GET_SINGLE_DOMAIN = gql`
  query GetSingleDomain($exactName: String!) {
    domain(where: { name: $exactName }) {
      id
      name
    }
  }
`;
