import { Coordinates } from './coordinates.type.js';
import { User } from './user.type.js';

export type Offer = {
  name: string;
  description: string;
  createdData: Date;
  city: string;
  previewImage: string,
  images: string[];
  premium: boolean;
  rating: number;
  bedrooms: number;
  guests: number;
  amenities: string[];
  autor: User;
  price: number;
  coordinates: Coordinates;
}
