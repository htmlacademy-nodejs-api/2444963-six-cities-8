import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const describe = getRandomItem<string>(this.mockData.describe);
    const city = getRandomItem<string>(this.mockData.city);
    const previewImage = getRandomItem(this.mockData.previewImage);
    const images = getRandomItems<string>(this.mockData.images).join('|');
    const premium = !!generateRandomValue(0, 1);
    const price = generateRandomValue(0, 5);
    const rating = generateRandomValue(0, 5);
    const bedrooms = generateRandomValue(0, 5);
    const guests = generateRandomValue(0, 5);
    const amenities = getRandomItems<string>(this.mockData.amenities).join('|');
    const autorRandom = getRandomItem(this.mockData.autor);
    const autor = `${autorRandom.name}|${autorRandom.avatarPath}|${autorRandom.email}|${autorRandom.typeUser}`;
    const coordinates = `${generateRandomValue(1000, 3000).toString()}|${generateRandomValue(1000, 3000).toString()}`;
    const createData = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      name,
      describe,
      createData,
      city,
      previewImage,
      images,
      premium,
      price,
      rating,
      bedrooms,
      guests,
      amenities,
      autor,
      coordinates,
    ].join('\t');
  }
}
