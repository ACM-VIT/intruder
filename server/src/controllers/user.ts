import * as Express from 'express';
import { Document } from 'mongoose';

import * as jwt from '../utils/jwt';
import User from '../models/user';

const router = Express.Router();

router.post('/enter', (req: Express.Request, res: Express.Response): any => {
  const { username, name } = req.body;
  if (typeof username !== 'string' || !username) {
    return res.status(422).json({
      error: true,
      data: { message: 'Username should be a non-empty STRING' },
    });
  }
  if (typeof name !== 'string' || !name) {
    return res.status(422).json({
      error: true,
      data: { message: 'Name should be a non-empty STRING' },
    });
  }
  User.findOne({ username }).then((data): Promise<Document> => {
    if (data) {
      res.status(409).json({
        error: true,
        data: { message: 'Username already exists' },
      });
      return null;
    }
    return User.create({ username, name });
  }).then((data) => {
    if (data !== null) {
      res.status(200).json({
        error: false,
        data: { token: jwt.issueToken({ username }) },
      });
    }
  }).catch(() => res.status(500).json({
    error: true,
    data: { message: 'Error creating user' },
  }));
  return null;
});

export default router;
