import gql from 'graphql-tag';

export const COUNT = gql`
  query {
    count @client {
      value
    }
  }
`;
