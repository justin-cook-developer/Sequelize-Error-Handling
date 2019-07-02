const Sequelize = require('sequelize');
const { connection, Model } = require('./connection');

class User extends Model {}
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [7],
      },
    },
  },
  { sequelize: connection, modelName: 'user' }
);

module.exports = User;
