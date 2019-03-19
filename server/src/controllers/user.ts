import * as Express from 'express';
import { Document } from 'mongoose';

import * as jwt from '../utils/jwt';
import { User } from '../models/user';

const router = Express.Router();

router.post('/enter', (req: Express.Request, res: Express.Response): any => {
  const { username, name, passcode } = req.body;
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
    return User.create({ username, name, passcode });
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

router.post('/login', (req: Express.Request, res: Express.Response): void => {
  const { username, passcode } = req.body;
  if (!username || typeof username !== 'string') {
    res.status(422).json({
      error: true,
      data: { message: 'Username should be a non-empty STRING' },
    });
    return null;
  }
  User.findOne({ username, passcode }).then((data): void => {
    if (!data) {
      res.status(401).json({
        error: true,
        data: { message: 'Username/Password is invalid' },
      });
      return null;
    }
    res.status(200).json({
      error: false,
      data: { token: jwt.issueToken({ username }) },
    });
  }).catch(() => res.status(500).json({
    error: true,
    data: { message: 'Internal server error' },
  }));
});

export default router;
