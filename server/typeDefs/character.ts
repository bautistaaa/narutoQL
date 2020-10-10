import { gql } from 'apollo-server-express';

const typeDef = gql`
  type Character {
    age: Int
    avatarSrc: String
    description: String
    firstAnimeAppearance: String
    firstMangaAppearance: String
    id: ID
    name: String
    nameMeaning: String
    notableFeatures: String
    notableQuotes: String
    rank: String
    village: Village
  }
`;

export default typeDef;
