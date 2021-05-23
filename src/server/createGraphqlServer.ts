import { ApolloServer } from 'apollo-server-express';
import { AuthChecker, buildSchema } from 'type-graphql';
import depthLimit from 'graphql-depth-limit';
import { VillageResolver } from './graphql/village';
import { CharacterResolver } from './graphql/character';
import { AuthResolver } from './graphql/auth';
import { ClanResolver } from './graphql/clan';
import { GraphQLError } from 'graphql';

export const customAuthChecker: AuthChecker = ({ context }, roles) => {
  // @ts-ignore
  const userRoles = context?.user?.roles;
  // @ts-ignore
  let allowed = false;
  for (let role of userRoles) {
    if (roles.includes(role)) {
      allowed = true;
      break;
    }
  }

  return allowed;
};

const createGraphqlServer = async () => {
  const formatError = (error: GraphQLError) => {
    return {
      message: error.message,
      statusCode: error?.extensions?.exception?.statusCode,
    };
  };
  const schema = await buildSchema({
    resolvers: [AuthResolver, CharacterResolver, ClanResolver, VillageResolver],
    authChecker: customAuthChecker,
  });

  return new ApolloServer({
    schema,
    validationRules: [depthLimit(4)],
    formatError,
    context: ({ req }: { req: any }) => {
      const context = {
        req,
        user: req.user,
      };
      return context;
    },
  });
};

export default createGraphqlServer;
