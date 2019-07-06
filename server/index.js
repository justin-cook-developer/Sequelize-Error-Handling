const express = require('express');
const morgan = require('morgan');

const { connection } = require('./db/index');
const parseErrors = require('./parseErrors');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api/index'));

app.use((req, res, next) => {
  res
    .status(404)
    .send('Invalid route. The only valid routes lie at /api/users.');
});

app.use((e, req, res, next) => {
  // this only works for the User model; need to abstract
  if (e.name === 'SequelizeValidationError') {
    console.log(e);
    res.json(parseErrors(e.errors));
    return;
  }
  next(e);
});

const logPort = () => console.log(`Listening at port: ${PORT}`);

connection
  .sync()
  .then(() => app.listen(PORT, logPort))
  .catch(console.error);
