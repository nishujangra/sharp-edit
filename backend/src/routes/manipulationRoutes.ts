import express from 'express';
import {
  // adjustBrightness,
//   adjustContrast,
  // adjustSaturation,
  // rotateImage,
  // convertImage,
  manipulateImage
} from '../controllers/manipulationController';

const router = express.Router();

// router.post('/brightness', adjustBrightness);
// // router.post('/contrast', adjustContrast);
// router.post('/saturation', adjustSaturation);
// router.post('/rotate', rotateImage);
// router.post('/convert', convertImage);

router.post('/manipulate', manipulateImage);

export default router;