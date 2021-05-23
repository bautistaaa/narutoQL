import { v4 as uuidv4 } from 'uuid';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Document } from 'mongoose';
import {
  Resolver,
  Arg,
  Query,
  Args,
  Mutation,
  Root,
  FieldResolver,
  Authorized,
} from 'type-graphql';
import {
  ApproveChangeInput,
  Character,
  Characters,
  CharacterModel,
  GetCharactersArgs,
  GetCharacterDraftsArgs,
  RejectChangeInput,
  UpdateCharacterInput,
} from './';
import NotFoundError from '../../utils/errors';
import { limit } from '../../utils/constants';

const createChange = (object: unknown) =>
  Object.entries(object).map(([k, v]) => {
    return {
      key: k,
      newValue: v,
    };
  });

@Resolver(() => Character)
export class CharacterResolver {
  @FieldResolver()
  @Authorized('ADMIN')
  drafts(@Root() character: Character) {
    return character.drafts.flat();
  }

  @Mutation(() => Boolean)
  async rejectChange(
    @Arg('data', () => RejectChangeInput)
    rejectChange: RejectChangeInput
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
  @Mutation(() => Boolean)
  async approveChange(
    @Arg('data', () => ApproveChangeInput)
    approveChange: ApproveChangeInput
  ): Promise<boolean> {
    const {
      id: characterId,
      draft: { id: draftId, changes },
    } = approveChange;
    const updates = changes.reduce((a, c) => {
      return {
        ...a,
        [c.key]: c.newValue,
      };
    }, {});
    const {
      age,
      firstAnimeAppearance,
      firstMangaAppearance,
      village,
      nameMeaning,
      notableFeatures,
      notableQuotes,
      rank,
      avatarSrc,
      description,
    } = await CharacterModel.findById(characterId);

    await CharacterModel.findOneAndUpdate(
      { _id: characterId },
      {
        ...updates,
        $push: {
          history: {
            id: uuidv4(),
            // @ts-ignore
            timeStamp: new Date(),
            ...{
              age,
              firstAnimeAppearance,
              firstMangaAppearance,
              village,
              nameMeaning,
              notableFeatures,
              notableQuotes,
              rank,
              avatarSrc,
              description,
            },
          },
        },
        // @ts-ignore
        $pull: { drafts: { id: draftId } },
      }
    );
    return true;
  }

  @Mutation(() => Boolean)
  async uploadPhoto(@Arg('file', () => GraphQLUpload) file: FileUpload) {
    const { createReadStream, filename } = await file;
    const writableStream = createWriteStream(
      `${__dirname}/../../../files/images/${filename}`,
      { autoClose: true }
    );
    return new Promise((res, rej) => {
      createReadStream()
        .pipe(writableStream)
        .on('finish', () => res(true))
        .on('error', () => rej(false));
    });
  }

  @Mutation(() => Character)
  async updateCharacter(
    @Arg('data', () => UpdateCharacterInput)
    updateCharacter: UpdateCharacterInput
  ): Promise<Character> {
    const { _id, ...datas } = updateCharacter;
    const changes = createChange(datas);
    const newDraft = { id: uuidv4(), timeStamp: new Date(), changes };
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

  @Query(() => Characters)
  async characterDrafts(
    @Args(() => GetCharacterDraftsArgs)
    getCharacterDraftsArgs: GetCharacterDraftsArgs
  ): Promise<Characters> {
    const { page = 1 } = getCharacterDraftsArgs;

    const query = { drafts: { $ne: null } };
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
