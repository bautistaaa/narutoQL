import { Document } from 'mongoose';
import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Clan, ClanModel, GetClanArgs } from './';
import NotFoundError from '../../utils/errors';

@Resolver(() => Clan)
export class ClanResolver {
  @Query(() => Clan)
  async clan(@Arg('id') id: string): Promise<Document> {
    try {
      const clan = await ClanModel.findById(id);
      return clan;
    } catch (error) {
      throw new NotFoundError('Clan not found!');
    }
  }

  @Query(() => [Clan])
  async clans(
    @Args(() => GetClanArgs) { village }: GetClanArgs
  ): Promise<Document[]> {
    return ClanModel.find({
      village: new RegExp(village, 'i'),
    }).exec();
  }
}
