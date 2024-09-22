import { v2 as cloudinary } from "cloudinary";
import isBase64 from "is-base64";

export const uploadPhotoToCloudinary = async (base64: string) => {
  cloudinary.config({
    cloud_name: "dfhzaqi4c",
    api_key: "312964993665181",
    api_secret: "mnrn4F_Tvin1HbQtpUZqzE32BnI",
  });
  try {
    if (!isBase64(base64, { mimeRequired: true })) throw "Invalid image!";

    const mimeType = base64.split(":")[1].split(";")[0].split("/")[0];
    if (mimeType !== "image") throw "Invalid image!";

    const uploadResult = await cloudinary.uploader.upload(base64, {
      format: "png",
    });

    return { url: uploadResult.url, err: null };
  } catch (err) {
    return { url: null, err };
  }
};

export const uploadDocumentToCloudinary = async (base64: string) => {
  cloudinary.config({
    cloud_name: "dfhzaqi4c",
    api_key: "312964993665181",
    api_secret: "mnrn4F_Tvin1HbQtpUZqzE32BnI",
  });
  try {
    if (!isBase64(base64, { mimeRequired: true })) throw "Invalid document!";

    const mimeType = base64.split(":")[1].split(";")[0].split("/")[1];
    if (mimeType !== "pdf") throw "Invalid document!";

    const uploadResult = await cloudinary.uploader.upload(base64, {
      format: "pdf",
    });

    return { url: uploadResult.url, err: null };
  } catch (err) {
    return { url: null, err };
  }
};
