import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

// import { Coordinates } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';
// import { UserEntity } from '../user/index.js';

class Coordinates {
  @prop({ required: true })
    latitude!: number;

  @prop({ required: true })
    longitude!: number;
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public previewImage!: string;

  @prop()
  public city!: string;

  @prop()
  public createdData!: Date;

  @prop({ type: () => [String], required: true })
  public images!: string[];

  @prop()
  public premium!: boolean;

  @prop({ required: true, type: () => Number, default: 0 })
  public rating!: number;

  @prop()
  public bedrooms: number;

  @prop()
  public guests!: number;

  @prop({ type: () => [String], required: true })
  public amenities!: string[];

  @prop()
  public autor!: string;

  @prop()
  public price!: number;

  @prop()
  public coordinates!: Coordinates;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);