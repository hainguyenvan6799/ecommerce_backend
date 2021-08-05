const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const uploadFile = (file) => {
  let myFile = file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${myFile[0]}_${Date.now()}.${fileType}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = { s3, uploadFile };
