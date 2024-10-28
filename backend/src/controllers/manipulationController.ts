import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';

// Utility function to get image file path
const getImagePath = (fileName: string) => path.join(__dirname, '../../uploads', fileName);

// Helper function to process image with reduced quality for preview
const processImage = async (inputPath: string, outputPath: string, options: sharp.SharpOptions) => {
  await sharp(inputPath)
    .resize({ width: 800 }) // Adjust as needed for preview resolution
    .jpeg({ quality: 50 }) // Lower quality for previews
    .toFile(outputPath);
};

export const manipulateImage = async (req: Request, res: Response) => {
  try {
    const { imageBuffer, brightness, saturation, rotation } = req.body;

    const imgUrl = getImagePath(imageBuffer);

    if (!imageBuffer) {
      return res.status(400).send('Image buffer is required');
    }

    let image = await sharp(imgUrl);

    if (brightness !== undefined) {
      image = image.modulate({ brightness });
    }

    if (saturation !== undefined) {
      image = image.modulate({ saturation });
    }

    if (rotation !== undefined) {
      image = image.rotate(rotation);
    }

    const manipulatedImageBuffer = await image.toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(manipulatedImageBuffer);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(`Error manipulating image: ${error.message}`);
    }
    else {
      res.status(500).send('Error manipulating image: Unknown error');
    }
  }
};