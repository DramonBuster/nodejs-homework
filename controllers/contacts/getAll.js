const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (favorite) {
    const favoriteContacts = await Contact.find({ owner: _id }, { favorite }).populate("owner", "_id name email");
    console.log(favoriteContacts);
    req.json({
      status: "success",
      code: 200,
      data: {
        result: favoriteContacts
      } 
    })
  }

  const allContacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");
  console.log(allContacts);
  res.json({
    status: "success",
    code: 200,
    data: {
      result: allContacts
    }
  });
}

module.exports = getAll;