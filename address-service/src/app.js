const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const { DB_HOST } = require('./config');

mongoose.connect(`mongodb://${DB_HOST}/address`);

const app = express();

app.use(body_parser.json());

app.use('/api/address', require('./router'));
/**
 * 404 middleware
 */
app.use((req, res, next) => {
  res.status(404).send('Not found');
});
/**
 * error handler
 */
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

let server = app.listen(process.env.PORT || 3000, () => {
  console.log(`address service up on ${server.address().port}`);
});