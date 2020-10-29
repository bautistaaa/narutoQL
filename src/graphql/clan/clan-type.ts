import { ArgsType, Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Clan {
  @Field()
  avatarSrc: string;
  @Field()
  description: string;
  @Field(() => ID)
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  signatureAbilities: string;
  @Field({ nullable: true })
  village: string;
}

@ArgsType()
export class GetClanArgs {
  @Field({ nullable: true })
  village?: string;
}
