import { getModelForClass, prop } from '@typegoose/typegoose';
import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Clan {
  @prop()
  @Field()
  avatarSrc: string;

  @prop()
  @Field()
  description: string;

  @prop()
  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  name: string;

  @prop()
  @Field({ nullable: true })
  signatureAbilities: string;

  @prop()
  @Field({ nullable: true })
  village: string;
}

@ArgsType()
export class GetClanArgs {
  @Field({ nullable: true })
  village?: string;
}

export const ClanModel = getModelForClass(Clan);
