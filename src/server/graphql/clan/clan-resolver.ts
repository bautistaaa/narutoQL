import { Document } from 'mongoose';
import { Arg, Args, Query, Resolver } from 'type-graphql';
import { Clan, ClanModel, Clans, GetClanArgs } from './';
import NotFoundError from '../../utils/errors';
import { limit } from '../../utils/constants';

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

  @Query(() => Clans)
  async clans(
    @Args(() => GetClanArgs) getClanArgs: GetClanArgs
  ): Promise<Clans> {
    const { page = 1 } = getClanArgs;

    const [results, count] = await Promise.all([
      ClanModel.find()
        .sort({ name: 1 })
        .limit(limit)
        .skip(page * limit - limit)
        .exec(),
      ClanModel.find().countDocuments(),
    ]);

    const pages = Math.ceil(count / limit);
    if (page > pages) {
      throw new NotFoundError('Invalid page');
    }

    return {
      info: {
        count,
        pages,
        next: page >= pages ? null : page + 1,
        prev: page < 2 ? null : page - 1,
      },
      results: results,
    };
  }
}
