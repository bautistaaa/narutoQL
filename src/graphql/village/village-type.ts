import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Village {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}
