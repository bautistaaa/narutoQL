import { Document } from 'mongoose';
import { Resolver, Arg, Query } from 'type-graphql';
import { Village } from './';
import VillageModel from '../../database/model/village';
import NotFoundError from '../../utils/errors';

@Resolver(() => Village)
export class VillageResolver {
  @Query(() => Village)
  async village(@Arg('id') id: string): Promise<Document> {
    try {
      const village = await VillageModel.findById(id);
      return village;
    } catch (error) {
      throw new NotFoundError('Village not found!');
    }
  }

  @Query(() => [Village])
  async villages(): Promise<Document[]> {
    return VillageModel.find();
  }
}
