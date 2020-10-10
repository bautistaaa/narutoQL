import { gql } from 'apollo-server-express';

const typeDef = gql`
  type Village {
    name: String
  }
`;

export default typeDef;
