const { User } = require("../../models")
const path = require("path")
const fs = require("fs/promises")
// const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", imageName);
        // "public/avatars/my-avatar.png"

        // const avatar = await Jimp.read(avatarURL);
        // await avatar.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE).quality(60).writeAsync(avatarURL);

        await User.findByIdAndUpdate(req.user._id, { avatarURL })
        res.status(200).json({
            avatarURL
        })
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
}

module.exports = updateAvatar;