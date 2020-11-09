import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('CharacterInput')
export class CharacterInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  rank?: string;

  @Field({ nullable: true })
  village?: string;
}
