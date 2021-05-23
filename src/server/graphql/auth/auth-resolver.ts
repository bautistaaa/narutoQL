import { Resolver, Arg, Mutation } from 'type-graphql';
import { LoginInput } from '.';
import { UserModel } from '../users';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Arg('data', () => LoginInput)
    loginInput: LoginInput
  ): Promise<string> {
    const { email, password } = loginInput;
    const user = await UserModel.findOne({ email }).exec();
    const instance = new UserModel({
      email: user.email,
      salt: user.salt,
      hash: user.hash,
      roles: user.roles,
    });

    if (!user) {
      throw new Error('No user with that email');
    }

    const valid = instance.validatePassword(password);
    const jwt = instance.generateJWT();

    if (!valid) {
      throw new Error('Incorrect password');
    }
    console.log(jwt);
    return jwt;
  }
}
