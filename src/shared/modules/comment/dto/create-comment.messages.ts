export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
  rating: {
    invalidFormat: 'rating field must be type of Number',
    minLength: 'Rating must be at least 1',
    maxLength: 'Rating must be no more than 5'
  }
} as const;
