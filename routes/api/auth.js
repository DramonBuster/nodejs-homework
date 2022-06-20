const express = require('express');

const { validation, ctrlWrapper } = require("../../middlewares")
const { auth: ctrl } = require("../../controllers");
const { userRegisterJoiSchema, userLoginJoiSchema } = require("../../models/user")

const router = express.Router();

router.post('/register', validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register)) // /signup можна замість /register
router.post('/login', validation(userLoginJoiSchema), ctrlWrapper(ctrl.login))

module.exports = router;