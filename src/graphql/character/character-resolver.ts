import { Document } from 'mongoose';
import { Resolver, Arg, Query, Args } from 'type-graphql';
import { Character, GetCharactersArgs } from './';
import CharacterModel from '../../database/model/character';
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
      throw new NotFoundError('Character not found!');
    }
  }

  @Query(() => [Character])
  async characters(
    @Args(() => GetCharactersArgs) { rank, village }: GetCharactersArgs
  ): Promise<Document[]> {
    return CharacterModel.find({
      rank: new RegExp(rank, 'i'),
      village: new RegExp(village, 'i'),
    }).exec();
  }
}
