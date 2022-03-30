const cloudinary = require ("cloudinary");

cloudinary.config({
  cloud_name: "dinrd9vop",
  api_key: "779179514642788",
  api_secret: "dqwDg8q8mvYtsvNrYQ0eF0Id7Bo",
});

module.exports = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file);
    return res.secure_url;
  } catch (error) {
    return error;
  }
};