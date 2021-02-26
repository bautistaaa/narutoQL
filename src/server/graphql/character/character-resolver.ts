import { Document } from 'mongoose';
import {
  Resolver,
  Arg,
  Query,
  Args,
  Mutation,
  Root,
  FieldResolver,
  Ctx,
} from 'type-graphql';
import {
  Character,
  Characters,
  CharacterModel,
  GetCharactersArgs,
  UpdateCharacterInput,
} from './';
import NotFoundError from '../../utils/errors';
import { limit } from '../../utils/constants';
import { Context } from 'vm';

const createChange = (object: unknown) =>
  Object.entries(object).map(([k, v]) => {
    return {
      key: k,
      newValue: v,
    };
  });

//(root, args, context)
@Resolver(() => Character)
export class CharacterResolver {
  //@FieldResolver()
  //history(@Root() character: Character, @Ctx() ctx: Context) {
  //return character.history;
  //}

  @FieldResolver()
  drafts(@Root() character: Character, @Ctx() ctx: Context) {
    console.log(ctx);
    return character.drafts.flat();
  }

  @Mutation(() => Character)
  async updateCharacter(
    @Arg('data', () => UpdateCharacterInput)
    updateCharacter: UpdateCharacterInput
  ): Promise<Character> {
    const { _id, ...datas } = updateCharacter;
    const changes = createChange(datas);
    const newDraft = { timeStamp: new Date(), changes };
    const results = await CharacterModel.findOneAndUpdate(
      { _id },
      {
        // @ts-ignore
        $push: { drafts: newDraft },
      }
    );
    return results;
  }

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
