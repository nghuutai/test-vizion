import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseSchema } from 'src/shared/schemas/base.schema';
import { POSITION } from '../enum/technical-test.enum';

export type TechnicalTestDocument = TechnicalTest & Document;

@Schema({ timestamps: true })
export class TechnicalTest extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, enum: POSITION })
  position: POSITION;

  @Prop()
  note: string;

  @Prop()
  dowloadUrl: string;
}

export const TechnicalTestSchema = SchemaFactory.createForClass(TechnicalTest);
