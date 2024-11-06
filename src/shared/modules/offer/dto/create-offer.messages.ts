export const CreateOfferValidationMessage = {
  name: {
    invalidFormat: 'The name must be type of String',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  city: {
    invalidFormat: 'The city must be one of the Cities list'
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  createdDate: {
    invalidFormat: 'must be a valid ISO date',
  },
  previewImage: {
    maxLength: 'Too short for field «previewImage»',
  },
  images: {
    minLength: 'The number of photos must be 6',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  premium: {
    invalidFormat: 'Field premium must be boolean',
  },
  favorite: {
    invalidFormat: 'Field premium must be boolean',
  },
  offerType: {
    invalidFormat: 'Field offerType must be one of the options: apartment, house, room, hotel'
  },
  rating: {
    invalidFormat: 'Field rating must be an integer',
    minLength: 'Minimum rating length must be 1',
    maxLength: 'Maximum rating length must be 5',
  },
  bedrooms: {
    invalidFormat: 'Field bedrooms must be an integer',
    minLength: 'Minimum bedrooms length must be 1',
    maxLength: 'Maximum bedrooms length must be 8',
  },
  guests: {
    invalidFormat: 'Field guests must be an integer',
    minLength: 'Minimum guests length must be 1',
    maxLength: 'Maximum guests length must be 10',
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array with one or more of the options: Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  }
} as const;
