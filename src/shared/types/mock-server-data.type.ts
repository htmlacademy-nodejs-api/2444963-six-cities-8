import { User } from './user.type.js';

export type MockServerData = {
  name: string[];
  describe: string[];
  createData: string[];
  city: string[];
  previewImage: string[],
  images: string[];
  premium: boolean[];
  favorite: boolean[];
  rating: string[];
  bedrooms: string[];
  guests: string[];
  amenities: string[];
  author: User[];
  commentsCount: string[];
  coordinates: string[];
}
