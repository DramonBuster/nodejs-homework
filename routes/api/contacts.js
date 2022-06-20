const express = require('express');

const { validation, ctrlWrapper } = require("../../middlewares")
const { contactsJoiScheme, statusContactsJoiScheme } = require("../../models")
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validation(contactsJoiScheme), ctrlWrapper(ctrl.add));

router.put('/:contactId', validation(contactsJoiScheme), ctrlWrapper(ctrl.updateById));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.patch('/:contactId/favorite', validation(statusContactsJoiScheme), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
