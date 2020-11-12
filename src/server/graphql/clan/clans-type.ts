import { ArgsType, Field, Int, ObjectType } from 'type-graphql';
import { DocumentType } from '@typegoose/typegoose';

import { Clan } from './';
import Info from '../info-type';

@ObjectType()
export class Clans {
  @Field(() => Info, { nullable: true })
  info?: Info;

  @Field(() => [Clan], { nullable: true })
  results?: DocumentType<Clan>[];
}

@ArgsType()
export class GetClanArgs {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field({ nullable: true })
  village?: string;
}
