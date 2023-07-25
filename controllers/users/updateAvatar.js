const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");
// console.log(avatarsDir);

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file; // імпортуємо шлях під імям tempUpload i originalname
    const { _id } = req.user;
    const filename = `${_id}_${originalname}`; //створюємо унікальне імя
    const resultUpload = path.join(avatarsDir, filename); //створюємо шлях де він має зберігатись
    await fs.rename(tempUpload, resultUpload); //переміщуємо з тимчасового місця в public/avatars
    const avatarURL = path.join("avatars", filename); //записуємо цей шлях в базу
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
