// const createError = require('http-errors')
const sgMail = require("@sendgrid/mail")
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "terradestroyman@ukr.net" };

    try {
        await sgMail.send(email);
        return true;
        // .then(() => console.log("Email send success"))
        // .catch(error => console.log(error.message))
    } catch (error) {
        console.log(error.message);
        throw error;
    }
    
}

// const email = {
//   to: "pacov73995@lenfly.com",
//   from: "terradestroyman@ukr.net",
//   subject: "Проверка мейла",
//   html: "<p>Проверка</p>"
// }

module.exports = sendEmail;