"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
// Controller to handle uploading of images
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Please upload an valid image file" });
    }
    // file information will be stored in req.file
    const imageUrl = `uploads/${req.file.filename}`;
    return res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: imageUrl
    });
};
exports.uploadImage = uploadImage;
