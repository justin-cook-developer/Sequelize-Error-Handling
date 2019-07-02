const Sequelize = require('sequelize');
const { connection, Model } = require('./connection');

class User extends Model {}
User.init({}, { sequelize: connection, modelName: 'user' });

module.exports = User;
