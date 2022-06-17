const Joi = require("joi");

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool()
})

const statusContactsScheme = Joi.object({
  favorite: Joi.bool().required()
})

module.exports = {
  contactsScheme,
  statusContactsScheme
};
