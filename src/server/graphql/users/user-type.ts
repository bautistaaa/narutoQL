import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
@ObjectType()
export class User {
  @prop({ unique: true })
  @Field()
  username: string;

  @prop({ unique: true })
  @Field()
  email: string;

  @Field(() => ID)
  _id: string;

  @prop()
  @Field()
  hash: string;

  @prop()
  @Field()
  salt: string;

  @prop()
  @Field(() => [String])
  roles: string[];

  public setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
  }
  public validatePassword(password: string) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
    return this.hash === hash;
  }
  public toAuthJSON() {
    return {
      username: this.username,
      email: this.email,
      token: this.generateJWT(),
    };
  }
  public generateJWT() {
    const today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        roles: this.roles.flat(),
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET
    );
  }
}

export const UserModel = getModelForClass(User);
