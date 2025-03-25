import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps: true})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true, index: true })
  email: string;

  @Prop()
  image: string;

  @Prop()
  phrase: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({
    type: [String],
    default: 'WRITER',
    enum: ['ADMIN', 'READER', 'WRITER'],
  })
  roles: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
