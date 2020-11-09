import { Document } from 'mongoose';
import { Resolver, Arg, Query, Args } from 'type-graphql';
import { Character, Characters, CharacterModel, GetCharactersArgs } from './';
import NotFoundError from '../../utils/errors';

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
    const { page = 1, filter: { name = '', rank = '', village = '' } = {} } =
      getCharacterArgs || {};

    const limit = 20;
    const query = {
      name: new RegExp(name, 'i'),
      rank: new RegExp(rank, 'i'),
      village: new RegExp(village, 'i'),
    };
    const [results, count] = await Promise.all([
      CharacterModel.find(query)
        .sort({ name: 1 })
        .limit(20)
        .skip(page * limit - limit)
        .exec(),
      CharacterModel.find(query).countDocuments(),
    ]);
    console.log(`^^^^^^^^^^^^^^^^^^`);
    console.log(results);
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
      results: results as any,
    };
  }
}
