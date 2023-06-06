const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(12),
    email: Joi.string().email(),
    password: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  });
  return schema.validate(data);
};

// validation login
const loginValidation = (data) => {
  const schma = Joi.object({
    username: Joi.string().min(4).max(12),
    password: Joi.string()
  });
  return schma.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;