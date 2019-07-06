/* eslint-disable complexity */
const sentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const parseValidate = e => {
  const { validatorKey: key, path } = e;
  let msg = '';

  if (key === 'notEmpty') {
    msg = sentenceCase(`${path} is required.`);
  } else if (key === 'isEmail') {
    msg = sentenceCase(`${path} must be a valid email address.`);
  } else if (key === 'len' && path === 'password') {
    msg = 'Password must be at least 7 characters long.';
  }

  return msg;
};

const parseNotValidate = e => {
  const { type, path } = e;
  let msg = '';

  if (type.startsWith('notNull')) {
    msg = sentenceCase(`${path} is required.`);
  } else if (type.startsWith('unique') && path === 'email') {
    msg = 'An account is already registered to this email address.';
  }

  return msg;
};

const parseError = e => {
  return e.type === 'Validation error' ? parseValidate(e) : parseNotValidate(e);
};

module.exports = parseError;
