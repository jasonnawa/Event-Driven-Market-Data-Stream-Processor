// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User2 extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [String], default: [] })
  subscribedStocks: string[];
}

export const User2Schema = SchemaFactory.createForClass(User2);
