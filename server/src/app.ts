import * as http from 'http';

import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import * as mongoose from 'mongoose';

import env from './env';

import UserRouter from './controllers/user';

env();
const app = Express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', UserRouter);

process.on('uncaughtException', (err: Error) => {
  process.stderr.write(`${err.toString()}\n`);
});

(mongoose as any).Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err: Error) => {
  if (err) {
    process.stderr.write(err.toString());
  }
  process.stdout.write('Connected to mongodb\n');
});

server.listen(process.env.PORT, () => {
  process.stdout.write(`Listening on port: ${process.env.PORT}\n`);
});

export { io };
