import { IUploadFiles, IUpload } from "../interfaces";
import fs from "fs";
import path from "path";
import { uploadRepo } from "../repositories";
import { FOLDER_IMG, ROUTE_PUBLIC_FOLDER } from "./../config/constantes";

export const getUploadService = async (): Promise<IUpload[] | []> => {
  const test: IUpload[] = await uploadRepo.find();
  return test;
};
export const createUploadService = async (data: IUploadFiles): Promise<IUpload[] | boolean> => {
  const files = Array.isArray(data.files) ? data.files : [data.files];
  const directori: string = FOLDER_IMG;
  const directoriFormated = path.join(__dirname, ROUTE_PUBLIC_FOLDER + directori);
  let dataResponse: IUpload[] = [];

  try {
    if (!fs.existsSync(directoriFormated)) {
      // Crea la carpeta si no existe
      fs.mkdirSync(directoriFormated);
      console.log(`Carpeta "${directoriFormated}" creada con éxito.`);
    }

    for (const element of files) {
      let oldPath = element.destination + "/" + element.originalname;
      let newPath = directoriFormated + element.originalname;
      let newData = {
        name: element.originalname,
        url: "/public/" + directori+element.originalname,
        type: element.mimetype,
        size: element.size,
      };

      await fs.promises.rename(oldPath, newPath);

      let data = await uploadRepo.create(newData);
      dataResponse.push(data);
      console.log("Successfully renamed - AKA moved!");
    }

    return dataResponse;
  } catch (error) {
    console.error(error);
    return false;
  }
};