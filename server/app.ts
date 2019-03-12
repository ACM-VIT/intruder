import * as Express from 'express';
import * as bodyParser from 'body-parser';

import env from './env';

env();
const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

process.on('uncaughtException', (err: Error) => {
  process.stderr.write(err.toString());
});

app.listen(process.env.PORT, () => {
  process.stdout.write(`Listening on port: ${process.env.PORT}`);
});
