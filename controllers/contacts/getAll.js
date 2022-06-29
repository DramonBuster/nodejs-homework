const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  
  if (favorite) {
    const favoriteContacts = await Contact.find({ $and: [{ owner: _id }, { favorite }] }).populate("owner", "_id name email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: favoriteContacts
      } 
    })
  } else {
    const allContacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");
    res.json({
      status: "success",
      code: 200,
      data: {
        result: allContacts
      }
    });
  }

  
}

module.exports = getAll;