const createError = require("http-errors");

const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404, "Not found")
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result
    }
  })
}

module.exports = removeById;