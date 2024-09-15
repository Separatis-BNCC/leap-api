import { v2 as cloudinary } from "cloudinary";
import { NextFunction } from "express";

export const uploadPhotoToCloudinary = (next: NextFunction, base64: string) => {
  cloudinary.config({
    cloud_name: "dfhzaqi4c",
    api_key: "312964993665181",
    api_secret: "mnrn4F_Tvin1HbQtpUZqzE32BnI",
  });

  const isBase64 = require("is-base64");
  if (isBase64(base64))
    return next();

  return 'Not Base64';
};
