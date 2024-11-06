import { Expose, Type } from 'class-transformer';

import { UserRdo } from '../../user/rdo/user.rdo.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public city: string;

  @Expose()
  public guests: number;

  @Expose()
  public premium: boolean;

  @Expose()
  public description: string;

  @Expose()
  public previewImage: string;

  @Expose()
  public images: string[];

  @Expose()
  public createdData: string;

  @Expose()
  public coordinates: Coordinates;

  @Expose()
  public price: number;

  @Expose()
  public offerType: string;

  @Expose()
  public commentCount: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
