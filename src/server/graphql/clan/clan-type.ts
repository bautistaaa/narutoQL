import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Clan {
  @prop()
  @Field()
  avatarSrc: string;

  @prop()
  @Field()
  description: string;

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

export const ClanModel = getModelForClass(Clan);
