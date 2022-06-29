const { Conflict } = require("http-errors")
const { nanoid } = require('nanoid')
const bcrypt = require("bcryptjs")
const gravatar = require("gravatar")

const { sendEmail } = require("../../utils")
const { User } = require("../../models")

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use")
    }
    const avatarUrl = gravatar.url(email);
    const verificationToken = nanoid();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ name, email, password: hashPassword, avatarUrl, verificationToken });

    console.log(email)

    const mail = {
        to: email,
        subject: "подтверждение мейла",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить почту</a>`
        
    };

    await sendEmail(mail);

    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            user: {
                name: result.name,
                email: result.email,
                subscription: result.subscription,
                avatarUrl: result.avatarUrl,
                verificationToken: result.verificationToken
            }
        }
    })
}

module.exports = register;