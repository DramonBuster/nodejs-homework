const createError = require('http-errors')
const { nanoid } = require("nanoid")

const { User } = require("../../models")
const { sendEmail } = require("../../utils")

const resendEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw createError(400, "Missing required field email")
    }

    const user = await User.findOne({ email });

    if (user.verify === true) {
        throw createError(400, "Verification has already been passed")
    }

    const verificationToken = nanoid();

    const mail = {
        to: email,
        subject: "Подтверждение мейла",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить почту</a>`
    }
    
    await sendEmail(mail);

    res.status(200).json({
        status: "success",
        code: 200,
        message: 'Verification email sent'
    })
}

module.exports = resendEmail;