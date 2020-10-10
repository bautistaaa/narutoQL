import { gql } from 'apollo-server-express';

const typeDef = gql`
  type Query {
    """
    Get a character by ID
    """
    character(id: ID!): Character
    """
    Get list of all characters
    """
    characters: [Character]
    """
    Get list of all clans
    """
    clans: [Clan]
    """
    Get list of all villages
    """
    villages: [Village]
  }
`;

export default typeDef;
