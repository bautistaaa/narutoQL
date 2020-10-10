import { gql } from 'apollo-server-express';

const typeDef = gql`
  type Clan {
    avatarSrc: String
    description: String
    id: ID
    name: String
    signatureAbilities: String
    village: Village
  }
`;

export default typeDef;
