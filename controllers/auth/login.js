const { Unauthorized } = require("http-errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const { User } = require("../../models")

const { SECRET_KEY } = process.env

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !user.verify || !bcrypt.compareSync(password, user.password)) {
        throw new Unauthorized("Email or password is wrong or not verified");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
    await User.findByIdAndUpdate(user._id, { token })
    res.json({
        status: "success",
        code: 200,
        data: {
            token,
            user: {
                name: user.name,
                email: user.email,
                subscription: user.subscription,
                avatarUrl: user.avatarUrl
            }
        }
    })
}

module.exports = login;