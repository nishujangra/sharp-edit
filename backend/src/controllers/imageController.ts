import { Request, Response } from "express";


// Controller to handle uploading of images
export const uploadImage = (req: Request, res: Response) => {
    if(!req.file){
        return res.status(400).json({message: "Please upload an valid image file"});
    }


    // file information will be stored in req.file
    const imageUrl = `uploads/${req.file.filename}`;
    return res.status(200).json({
        message: "Image uploaded successfully",
        imageUrl: imageUrl
    })
}