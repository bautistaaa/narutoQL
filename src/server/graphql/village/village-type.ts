import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Village {
  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  name: string;
}

export const VillageModel = getModelForClass(Village);
