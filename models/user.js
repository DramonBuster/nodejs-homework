const { Schema, model } = require("mongoose")
const Joi = require("joi")

const userSchema = Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
    type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarUrl: {
        type: String,
        required: true
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true })

const userRegisterJoiSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
    token: Joi.string()
})

const userLoginJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
})

const userUpdateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business")
})

const userResendEmailSchema = Joi.object({
    email: Joi.string().required(),
})

const User = model("user", userSchema)

module.exports = {
    User,
    userRegisterJoiSchema,
    userLoginJoiSchema,
    userUpdateSubscriptionSchema,
    userResendEmailSchema
}