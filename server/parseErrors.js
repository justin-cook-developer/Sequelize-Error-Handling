/* eslint-disable complexity */
const sentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const parseError = e => {
  const { type, path, validatorKey } = e;
  let msg = '';

  if (type.startsWith('notNull') || validatorKey === 'notEmpty') {
    msg = sentenceCase(`${path} is required.`);
  } else if (type.startsWith('unique') && path === 'email') {
    msg = 'An account is already registered to this email address.';
  } else if (type === 'Validation error') {
    if (validatorKey === 'isEmail') {
      msg = sentenceCase(`${path} must be a valid email address.`);
    } else if (validatorKey === 'len' && path === 'password') {
      msg = 'Password must be at least 7 characters long.';
    }
  }

  return msg;
};

const formatMessages = errMsgs => {
  const msgs = {};

  for (let attribute in errMsgs) {
    if (errMsgs.hasOwnProperty(attribute)) {
      const errs = errMsgs[attribute];
      msgs[attribute] = errs.length ? errs.join(' ') : '';
    }
  }

  return { errors: msgs };
};

const parseErrors = errors => {
  const errMessages = errors.reduce(
    (errs, err) => {
      const msg = parseError(err);
      if (msg.length) {
        errs[err.path].push(msg);
      }
      return errs;
    },
    {
      name: [],
      email: [],
      password: [],
    }
  );
  return formatMessages(errMessages);
};

module.exports = parseErrors;
