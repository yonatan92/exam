import raw from '../../middleware/route-async-wrapper';
import express, { Request, Response, NextFunction } from 'express';
import log from '@ajar/marker';
import { createPlace } from './places.service';
import { validate_place, Place } from './places-type-validate';

const router = express.Router();

// parse json req.body on post routes
router.use(express.json());

// CREATES A NEW Place
router.post(
  '/',
  raw(async (req: Request, res: Response) => {
    console.log('ggsdfdsfsd');
    log.obj(req.body, 'create a Place, req.body:');

    const valid = validate_place(req.body);
    if (!valid && validate_place.errors) throw validate_place.errors[0];

    const { status, message, result } = await createPlace(req.body);
    res.status(status).json({ message, result });
  })
);

export default router;
