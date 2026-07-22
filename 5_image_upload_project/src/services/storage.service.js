const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, originalname = "image.jpg") {
  console.log("Uploading file buffer:", buffer ? `${buffer.length} bytes` : "null");

  // Generate a unique filename using timestamp + clean original name
  const cleanName = originalname.replace(/[^a-zA-Z0-9.]/g, "_");
  const fileName = `${Date.now()}-${cleanName}`;

  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: fileName,
  });

  return result;
}

module.exports = uploadFile;