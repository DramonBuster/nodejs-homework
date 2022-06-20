const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
}, { versionKey: false, timestamps: true });
  
const Contact = model("contact", contactSchema);

const contactsJoiScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool()
})

const statusContactsJoiScheme = Joi.object({
  favorite: Joi.bool().required()
})

module.exports = {
    contactsJoiScheme,
    statusContactsJoiScheme,
    Contact
};
