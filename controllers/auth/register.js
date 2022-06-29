const { Conflict } = require("http-errors")
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")

const { User } = require("../../models")

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use")
    }
    const avatarUrl = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ name, email, password: hashPassword, avatarUrl });
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                name: result.name,
                email: result.email,
                subscription: result.subscription,
                avatarUrl: result.avatarUrl
            }
        }
    })
}

module.exports = register;