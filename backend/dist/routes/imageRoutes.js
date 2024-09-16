"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multerConfig_1 = require("../middleware/multerConfig");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
// Route for uploading images
router.post('/upload', multerConfig_1.upload.single('image'), imageController_1.uploadImage);
exports.default = router;
