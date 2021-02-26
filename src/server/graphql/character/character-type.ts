import { getModelForClass, prop } from '@typegoose/typegoose';

import { Field, Int, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class CharacterHistory {
  @prop()
  @Field(() => Int, { nullable: true })
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

  @Field(() => ID)
  _id: string;

  @prop()
  @Field({ nullable: true })
  name?: string;

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

  @prop()
  @Field()
  timeStamp: string;
}

@ObjectType()
export class Change {
  @prop()
  @Field()
  key: string;

  @prop()
  @Field()
  newValue: string;
}

@ObjectType()
export class CharacterDraft {
  @prop()
  @Field()
  timeStamp: string;

  @prop()
  @Field(() => [Change])
  changes: Change[];
}

@ObjectType()
export class Character {
  @prop()
  @Field(() => Int, { nullable: true })
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

  @prop()
  @Field(() => [CharacterHistory], { nullable: true })
  history?: CharacterHistory[];

  @prop()
  @Field(() => [CharacterDraft], { nullable: true })
  drafts?: CharacterDraft[];
}

export const CharacterModel = getModelForClass(Character);
