const express = require('express');
const router = express.Router();

const { User } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({
      msg: `The user with id ${req.params.id} was successfullly deleted.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
