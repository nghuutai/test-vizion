import { Prop } from '@nestjs/mongoose';

export class BaseSchema {
  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop()
  deletedAt: Date;

  @Prop()
  deletedBy: string;

  @Prop({ type: Boolean, required: true, default: false })
  deleted: boolean;
}
