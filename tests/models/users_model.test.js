'use strict';

const chai = require('chai');
const expect = chai.expect;
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

const { User, connection } = require('../../server/db/index');

describe('The `User` Model', () => {
  // Drop and recreate all tables before each run
  before(() => connection.sync({ force: true }));

  // build a non-persisted User instance before each test
  let user;

  beforeEach(() => {
    user = User.build({
      name: 'Jeff Steez',
      email: 'jeffDrinksBeer@gmail.com',
      password: 'jeffRulesBro',
    });
  });

  // delete all User instaces after each test
  afterEach(() => {
    return User.truncate({ cascade: true });
  });

  describe('attributes definition', () => {
    it('includes name, email, and password fields', async () => {
      const savedUser = await user.save();

      expect(savedUser.name).to.equal('Jeff Steez');
      expect(savedUser.email).to.equal('jeffDrinksBeer@gmail.com');
      expect(savedUser.password).to.equal('jeffRulesBro');
    });

    it('requires `name`', async () => {
      user.name = null;

      let result, error;
      try {
        result = await user.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when name is null');

      user.name = '';

      let result2, error2;
      try {
        result2 = await user.validate();
      } catch (err) {
        error2 = err;
      }

      if (result2)
        throw Error('validation should fail when name is an empty string');

      expect(error).to.be.an.instanceOf(Error);
      expect(error2).to.be.an.instanceOf(Error);
    });

    it('requires `email`', async () => {
      user.email = null;

      let result, error;
      try {
        result = await user.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when email is null');

      user.email = '';

      let result2, error2;
      try {
        result2 = await user.validate();
      } catch (err) {
        error2 = err;
      }

      if (result2)
        throw Error('validation should fail when email is an empty string');

      expect(error).to.be.an.instanceOf(Error);
      expect(error2).to.be.an.instanceOf(Error);
    });

    it('requires `email` to be a valid email', async () => {
      user.email = 'jeffHasNoEmail';

      let result, error;
      try {
        result = await user.validate();
      } catch (err) {
        error = err;
      }

      if (result)
        throw Error('validation should fail when email is not a valid email');

      expect(error).to.be.an.instanceOf(Error);
    });

    it('requires `email` to be unique', async () => {
      await user.save();

      const user2 = User.build({
        name: 'Jeff SuperSteez',
        email: 'jeffDrinksBeer@gmail.com',
        password: 'jeffSteezTookMyEmail',
      });

      let result, error;
      try {
        result = await user2.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail if email is not unique');

      expect(error).to.be.an.instanceOf(Error);
    });

    it('requires password', async () => {
      user.password = null;

      let result, error;
      try {
        result = await user.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when password is null');

      user.password = '';

      let result2, error2;
      try {
        result2 = await user.validate();
      } catch (err) {
        error2 = err;
      }

      if (result2)
        throw Error('validation should fail when password is an empty string');

      expect(error).to.be.an.instanceOf(Error);
      expect(error2).to.be.an.instanceOf(Error);
    });

    it('requires password to be longer than 6 characters', async () => {
      user.password = 'hiBro';

      let result, error;
      try {
        result = await user.validate();
      } catch (err) {
        error = err;
      }

      if (result)
        throw Error(
          'validation should fail if password is less than 7 characters'
        );

      expect(error).to.be.an.instanceOf(Error);
    });
  });
});
