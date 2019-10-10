import gql from 'graphql-tag';

export const UPDATE_COUNT = gql`
  mutation UpdateCount($amount: Int!) {
    updateCount(amount: $amount) @client
  }
`;
