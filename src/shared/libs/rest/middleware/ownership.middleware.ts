import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { OfferService } from '../../../modules/offer/offer-service.interface.js';

export class OwnershipMiddleware implements Middleware {
  constructor(
    private readonly offerService: OfferService
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { offerId } = req.params;
    const userId = req.tokenPayload?.id;

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'Offer not found',
        'OwnershipMiddleware'
      );
    }

    console.log(`Offer userId: ${offer.userId._id}, Request userId: ${userId}`);

    if (offer.userId._id.toString() !== userId) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        'You are not authorized to modify this offer',
        'OwnershipMiddleware'
      );
    }

    next();
  }
}
