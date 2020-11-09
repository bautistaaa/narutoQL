import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Info {
  @Field()
  count: number;

  @Field()
  pages: number;

  @Field({ nullable: true })
  next: number;

  @Field({ nullable: true })
  prev: number;
}

export default Info
