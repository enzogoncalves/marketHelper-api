import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
// import {  } from '@aws-sdk/client-s3'

const uploadController = {
	uploadImage: (req: Request, res: Response) => {
		console.log(req.files)

		res.json('200!!')
	}
}

export { uploadController} 