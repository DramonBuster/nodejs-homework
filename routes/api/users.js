const express = require('express');

const { auth, ctrlWrapper } = require("../../middlewares")
const { users: ctrl } = require("../../controllers");


const router = express.Router();

router.get('/current', ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

module.exports = router;