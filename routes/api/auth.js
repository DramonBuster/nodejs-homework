const express = require('express');

const { auth, validation, ctrlWrapper } = require("../../middlewares")
const { auth: ctrl } = require("../../controllers");
const { userRegisterJoiSchema, userLoginJoiSchema, userUpdateSubscriptionSchema } = require("../../models/user")

const router = express.Router();

router.post('/signup', validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register)) // /signup можна замість /register
router.post('/login', validation(userLoginJoiSchema), ctrlWrapper(ctrl.login))
router.post('/logout', auth, ctrlWrapper(ctrl.logout));
router.patch('/users', auth, validation(userUpdateSubscriptionSchema), ctrlWrapper(ctrl.updateSubscription))

module.exports = router;