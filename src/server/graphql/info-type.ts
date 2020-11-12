import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
class Info {
  @Field(() => Int)
  count: number;

  @Field(() => Int)
  pages: number;

  @Field(() => Int, { nullable: true })
  next: number;

  @Field(() => Int, { nullable: true })
  prev: number;
}

export default Info;
