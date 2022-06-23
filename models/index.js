const {
    contactsJoiScheme,
    statusContactsJoiScheme,
    Contact,
} = require("./contact");
const {
    User,
    userRegisterJoiSchema,
    userLoginJoiSchema,
    userUpdateSubscriptionSchema
} = require("./user");

module.exports = {
    contactsJoiScheme,
    statusContactsJoiScheme,
    Contact,
    User,
    userRegisterJoiSchema,
    userLoginJoiSchema,
    userUpdateSubscriptionSchema
}