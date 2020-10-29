import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Character {
  @Field({ nullable: true })
  age: number;
  @Field({ nullable: true })
  avatarSrc: string;
  @Field()
  description: string;
  @Field({ nullable: true })
  firstAnimeAppearance: string;
  @Field({ nullable: true })
  firstMangaAppearance: string;
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  nameMeaning: string;
  @Field({ nullable: true })
  notableFeatures: string;
  @Field({ nullable: true })
  notableQuotes: string;
  @Field({ nullable: true })
  rank: string;
  @Field({ nullable: true })
  village: string;
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
