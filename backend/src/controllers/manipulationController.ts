import { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// Utility function to get image file path
const getImagePath = (fileName: string) => path.join(__dirname, '../../uploads', fileName);

// Utility function to remove file  
const removeFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper function to process image with reduced quality for preview
const processImage = async (inputPath: string, outputPath: string, options: sharp.SharpOptions) => {
  await sharp(inputPath)
    .resize({ width: 800 }) // Adjust as needed for preview resolution
    .jpeg({ quality: 50 }) // Lower quality for previews
    .toFile(outputPath);
};

// Brightness Adjustment
export const adjustBrightness = async (req: Request, res: Response) => {
  const { fileName, brightness } = req.body;
  if (!fileName || !brightness) {
    return res.status(400).json({ error: 'File name and brightness value are required' });
  }

  try {
    const fileNameExtracted = fileName.includes('uploads/') ? fileName.split('uploads/')[1] : fileName;
    const filePath = getImagePath(fileNameExtracted);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const outputPath = getImagePath(`brightness-${fileNameExtracted}`);
    await sharp(filePath)
      .modulate({ brightness: parseFloat(brightness) })
      .resize({ width: 800 }) // Adjust as needed for preview resolution
      .jpeg({ quality: 50 }) // Lower quality for previews
      .png({ quality: 50 }) // Lower quality for previews
      .toFile(outputPath);

    if (!fs.existsSync(outputPath)) {
      return res.status(404).json({ error: 'Output file Not created' });
    }

    const outputFileName = outputPath.includes('uploads/') ? outputPath.split('uploads/')[1] : outputPath;

    res.sendFile(outputFileName);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Image processing failed' });
  }
};

// Contrast Adjustment
// export const adjustContrast = async (req: Request, res: Response) => {
//   const { fileName, contrast } = req.body;
//   if (!fileName || !contrast) {
//     return res.status(400).json({ error: 'File name and contrast value are required' });
//   }

//   try {
//     const filePath = getImagePath(fileName);
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ error: 'File not found' });
//     }

//     const outputPath = getImagePath(`contrast-${fileName}`);
//     await sharp(filePath)
//       .modulate({ contrast: parseFloat(contrast) })
//       .resize({ width: 800 }) // Adjust as needed for preview resolution
//       .jpeg({ quality: 50 }) // Lower quality for previews
//       .toFile(outputPath);

//     res.sendFile(outputPath, { root: '.' });
//     removeFile(outputPath);
//   } catch (error) {
//     res.status(500).json({ error: 'Image processing failed' });
//   }
// };

// Saturation Adjustment
export const adjustSaturation = async (req: Request, res: Response) => {
  const { fileName, saturation } = req.body;
  if (!fileName || !saturation) {
    return res.status(400).json({ error: 'File name and saturation value are required' });
  }

  try {
    const fileNameExtracted = fileName.includes('uploads/') ? fileName.split('uploads/')[1] : fileName;
    const filePath = getImagePath(fileNameExtracted);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const outputPath = getImagePath(`saturation-${fileNameExtracted}`);
    await sharp(filePath)
      .modulate({ saturation: parseFloat(saturation) })
      .resize({ width: 800 }) // Adjust as needed for preview resolution
      .jpeg({ quality: 50 }) // Lower quality for previews
      .toFile(outputPath);

    if (!fs.existsSync(outputPath)) {
      return res.status(404).json({ error: 'Output file Not created' });
    }
    const outputFileName = outputPath.includes('uploads/') ? outputPath.split('uploads/')[1] : outputPath;
    res.sendFile(outputFileName);
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed' });
  }
};

// Rotation
export const rotateImage = async (req: Request, res: Response) => {
  const { fileName, rotation } = req.body;
  if (!fileName || !rotation) {
    return res.status(400).json({ error: 'File name and rotation angle are required' });
  }

  try {
    const fileNameExtracted = fileName.includes('uploads/') ? fileName.split('uploads/')[1] : fileName;
    const filePath = getImagePath(fileNameExtracted);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const outputPath = getImagePath(`rotate-${fileNameExtracted}`);
    await sharp(filePath)
      .rotate(parseInt(rotation))
      .resize({ width: 800 }) // Adjust as needed for preview resolution
      .jpeg({ quality: 50 }) // Lower quality for previews
      .toFile(outputPath);

    if (!fs.existsSync(outputPath)) {
      return res.status(404).json({ error: 'Output file Not created' });
    }
    const outputFileName = outputPath.includes('uploads/') ? outputPath.split('uploads/')[1] : outputPath;
    res.sendFile(outputFileName);
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed' });
  }
};

// Conversion between PNG and JPEG
export const convertImage = async (req: Request, res: Response) => {
  const { fileName, format } = req.body;
  if (!fileName || !format) {
    return res.status(400).json({ error: 'File name and target format are required' });
  }

  // Validate format
  const allowedFormats = ['jpeg', 'png'];
  if (!allowedFormats.includes(format)) {
    return res.status(400).json({ error: 'Unsupported format' });
  }

  try {
    const fileNameExtracted = fileName.includes('uploads/') ? fileName.split('uploads/')[1] : fileName;
    const filePath = getImagePath(fileNameExtracted);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    const outputPath = getImagePath(`converted-${fileNameExtracted}`);
    await sharp(filePath)
      .resize({ width: 800 }) // Adjust as needed for preview resolution
      .toFormat(format as 'jpeg' | 'png', { quality: 50 }) // Lower quality for previews
      .toFile(outputPath);

    if (!fs.existsSync(outputPath)) {
      return res.status(404).json({ error: 'Output file Not created' });
    }
    const outputFileName = outputPath.includes('uploads/') ? outputPath.split('uploads/')[1] : outputPath;
    res.sendFile(outputFileName);
  } catch (error) {
    res.status(500).json({ error: 'Image processing failed' });
  }
};
