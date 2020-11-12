import { Document } from 'mongoose';
import { Resolver, Arg, Query, Args } from 'type-graphql';
import { Village, Villages, VillageModel } from './';
import NotFoundError from '../../utils/errors';
import { limit } from '../../utils/constants';
import { GetVillagesArgs } from './villages-type';

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

  @Query(() => Villages)
  async villages(
    @Args(() => GetVillagesArgs) getVillagesArgs: GetVillagesArgs
  ): Promise<Villages> {
    const { page = 1 } = getVillagesArgs;

    const [results, count] = await Promise.all([
      VillageModel.find()
        .sort({ name: 1 })
        .limit(limit)
        .skip(page * limit - limit)
        .exec(),
      VillageModel.find().countDocuments(),
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
