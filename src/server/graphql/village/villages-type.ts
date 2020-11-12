import { ArgsType, Field, Int, ObjectType } from 'type-graphql';
import { DocumentType } from '@typegoose/typegoose';

import { Village } from './';
import Info from '../info-type';

@ObjectType()
export class Villages {
  @Field(() => Info, { nullable: true })
  info?: Info;

  @Field(() => [Village], { nullable: true })
  results?: DocumentType<Village>[];
}

@ArgsType()
export class GetVillagesArgs {
  @Field(() => Int, { nullable: true })
  page?: number;
}
