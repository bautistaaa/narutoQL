import { Arg, Mutation, Resolver } from 'type-graphql';
import { User, UserLoginInput, UserModel } from '.';

@Resolver(() => User)
export class UserResolver {
  @Mutation(() => Boolean)
  async login(
    @Arg('data', () => UserLoginInput)
    userLoginInput: UserLoginInput
  ): Promise<boolean> {
    console.log(userLoginInput);
    return Promise.resolve(true);
  }
}
