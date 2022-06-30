const express = require('express');

const { auth, upload, validation, ctrlWrapper } = require("../../middlewares")
const { userResendEmailSchema } = require("../../models")
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));
router.patch('/avatars', auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyEmail));
router.post('/verify', validation(userResendEmailSchema), ctrlWrapper(ctrl.resendEmail));

module.exports = router;