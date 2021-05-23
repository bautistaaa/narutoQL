import { ArgsType, Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { Character, CharacterInput } from './';

import Info from '../info-type';
import { DocumentType } from '@typegoose/typegoose';

@ObjectType()
export class Characters {
  @Field(() => Info, { nullable: true })
  info?: Info;

  @Field(() => [Character], { nullable: true })
  results?: DocumentType<Character>[];
}

@ArgsType()
export class GetCharactersArgs {
  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => CharacterInput, { nullable: true })
  filter?: CharacterInput;
}

@ArgsType()
export class GetCharacterDraftsArgs {
  @Field(() => Int, { nullable: true })
  page?: number;
}

@InputType()
export class UpdateCharacterInput implements Partial<Character> {
  @Field(() => Int, { nullable: true })
  age?: number;

  @Field({ nullable: true })
  avatarSrc?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  firstAnimeAppearance?: string;

  @Field({ nullable: true })
  firstMangaAppearance?: string;

  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  nameMeaning?: string;

  @Field({ nullable: true })
  notableFeatures?: string;

  @Field({ nullable: true })
  notableQuotes?: string;

  @Field({ nullable: true })
  rank?: string;

  @Field({ nullable: true })
  village?: string;
}

@InputType()
export class ChangeInput {
  @Field()
  key: string;

  @Field()
  newValue: string;
}

@InputType()
export class CharacterDraftInput {
  @Field()
  id: string;

  @Field()
  timeStamp: string;

  @Field(() => [ChangeInput])
  changes: ChangeInput[];
}

@InputType()
export class ApproveChangeInput {
  @Field()
  id: string;

  @Field(() => CharacterDraftInput)
  draft: CharacterDraftInput;
}

@InputType()
export class RejectChangeInput {
  @Field()
  id: string;
  @Field()
  draftId: string;
}
