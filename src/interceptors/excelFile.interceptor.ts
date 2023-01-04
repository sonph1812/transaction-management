import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";

// Multer configuration
export const multerConfig = {
  dest: './Data',
};

// Multer upload options
export const excelConfig = {

  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match('jpg|jpeg|png|gif|pdf|msg|eml|docx|doc|xlsx|xls')) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
    }
  },
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);

    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, file.originalname);
if (file.originalname !== 'bvote-contestants-temp.xlsx')
cb( new HttpException(`Unsupported file name ${(file.originalname)}`,HttpStatus.CONFLICT))},
  }),
};
