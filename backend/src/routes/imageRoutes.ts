import { Router } from "express";
import { upload } from "../middleware/multerConfig";
import { uploadImage } from "../controllers/imageController";


const router = Router();

// Route for uploading images
router.post('/upload', upload.single('image'), uploadImage);

export default router;