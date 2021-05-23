import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
@InputType('LoginInput')
export class LoginInput {
  @Field({nullable: true})
  email?: string;

  @Field({nullable: true})
  password?: string;
}
