const fs = require("fs");
const fsPromises = fs.promises;
async function getGallery() {
  let images = [];
  try {
    images = await fsPromises.readdir(`${__dirname}/../public/uploads/gallery`);
  } catch (error) {
    console.log(error);
  }
  console.log(images);
  return images.map((x) => `/uploads/gallery/${x}`);
}

module.exports = getGallery;
