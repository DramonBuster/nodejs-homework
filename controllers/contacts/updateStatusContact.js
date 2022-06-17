const { Contact } = require("../../models");
const createError = require("http-errors");

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!result) {
        throw createError(404, "Not found")
    }

    res.status(200).json({
        status: "success",
        code: 200,
        message: "Contact successfully updated",
        data: {
        result
        }
    })
}

module.exports = updateStatusContact;