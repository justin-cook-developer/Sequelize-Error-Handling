const express = require('express');
const morgan = require('morgan');

const { connection } = require('./db/index');

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
  console.error(e);
  next(e);
});

connection
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Listening at port: ${PORT}`)))
  .catch(console.error);
