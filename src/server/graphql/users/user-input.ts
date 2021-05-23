import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('UserLoginInput')
export class UserLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
