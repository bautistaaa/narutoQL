import { getModelForClass, prop } from '@typegoose/typegoose';
import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Character {
  @prop()
  @Field({ nullable: true })
  age?: number;

  @prop()
  @Field({ nullable: true })
  avatarSrc?: string;

  @prop()
  @Field({ nullable: true })
  description?: string;

  @prop()
  @Field({ nullable: true })
  firstAnimeAppearance?: string;

  @prop()
  @Field({ nullable: true })
  firstMangaAppearance?: string;

  @prop()
  @Field(() => ID)
  _id: string;

  @prop({ required: true, unique: true })
  @Field()
  name: string;

  @prop()
  @Field({ nullable: true })
  nameMeaning?: string;

  @prop()
  @Field({ nullable: true })
  notableFeatures?: string;

  @prop()
  @Field({ nullable: true })
  notableQuotes?: string;

  @prop()
  @Field({ nullable: true })
  rank?: string;

  @prop()
  @Field({ nullable: true })
  village?: string;
}

@ArgsType()
export class GetCharactersArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  rank?: string;

  @Field({ nullable: true })
  village?: string;
}

export const CharacterModel = getModelForClass(Character);

