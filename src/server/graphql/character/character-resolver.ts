import { Document } from 'mongoose';
import { Resolver, Arg, Query, Args } from 'type-graphql';
import { Character, Characters, CharacterModel, GetCharactersArgs } from './';
import NotFoundError from '../../utils/errors';
import { limit } from '../../utils/constants';

@Resolver()
export class CharacterResolver {
  @Query(() => Character)
  async character(@Arg('id') id: string): Promise<Document> {
    try {
      const character = await CharacterModel.findById(id);
      return character;
    } catch (error) {
      throw new NotFoundError('Character not found!');
    }
  }

  @Query(() => Characters)
  async characters(
    @Args(() => GetCharactersArgs) getCharacterArgs: GetCharactersArgs
  ): Promise<Characters> {
    const {
      page = 1,
      filter: { name, rank: ranks = [], village: villages = [] } = {},
    } = getCharacterArgs;

    const villageRegexes = villages.map(
      village => new RegExp(village || '', 'i')
    );
    const rankRegexes = ranks.map(rank => new RegExp(rank || '', 'i'));

    const query = {
      name: new RegExp(name, 'i'),
      rank: rankRegexes.length > 0 ? { $in: rankRegexes } : new RegExp('', 'i'),
      village:
        villageRegexes.length > 0
          ? { $in: villageRegexes }
          : new RegExp('', 'i'),
    };
    const [results, count] = await Promise.all([
      CharacterModel.find(query)
        .sort({ name: 1 })
        .limit(limit)
        .skip(page * limit - limit)
        .exec(),
      CharacterModel.find(query).countDocuments(),
    ]);
    const pages = Math.ceil(count / limit);

    if (page > pages && pages !== 0) {
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
