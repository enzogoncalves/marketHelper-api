import express from 'express'
import { uploadController } from "./upload_controller";

export const uploadRoute = express.Router();

uploadRoute.post('/', uploadController.uploadImage)