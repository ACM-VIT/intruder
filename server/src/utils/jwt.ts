import * as jwt from 'jsonwebtoken';

export function issueToken(payload): string {
  return jwt.sign(payload, process.env.JWT_SECCRET);
}

export function verify(token): any {
  return jwt.verify(token, process.env.JWT_SECRET);
}
