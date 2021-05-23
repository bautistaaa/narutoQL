import {
  Resolver,
  Arg,
  Mutation,
} from 'type-graphql';

@Resolver()
class AuthResolver {
  @Mutation(() => Boolean)
  async login(
    @Arg('data', () => LoginInput)
    loginInput: LoginInput
  ): Promise<boolean> {
    const { id, draftId } = rejectChange;
    await CharacterModel.findOneAndUpdate(
      { _id: id },
      {
        // @ts-ignore
        $pull: { drafts: { id: draftId } },
      }
    );
    return true;
  }
}

