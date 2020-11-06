import { Document } from 'mongoose';
import { Resolver, Arg, Query, Args } from 'type-graphql';
import { Character, CharacterModel, GetCharactersArgs } from './';
import NotFoundError from '../../utils/errors';

@Resolver()
export class CharacterResolver {
  @Query(() => Character)
  async character(@Arg('id') id: string): Promise<Document> {
    try {
      const character = await CharacterModel.findById(id);
      return character;
    } catch (error) {
      console.log(error);
      throw new NotFoundError('Character  found!');
    }
  }

  @Query(() => [Character])
  async characters(
    @Args(() => GetCharactersArgs) { name, rank, village }: GetCharactersArgs
  ): Promise<Document[]> {
    return CharacterModel.find({
      name: new RegExp(name, 'i'),
      rank: new RegExp(rank, 'i'),
      village: new RegExp(village, 'i'),
    }).exec();
  }
}
