const { uploadFile } = require("../services/AWS");

const fileController = {
  uploadFileToAws: async (req, res) => {
    const arr = req.files.map(async (file) => {
      const result = await uploadFile(file);
      return result;
    });
    const values = await Promise.all(arr);
    return res.json({ arr: values });
  },
};

module.exports = fileController;
