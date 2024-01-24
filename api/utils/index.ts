import { Response } from "express";
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { IUpload, IOrders, IOrdersUpdate } from "../interfaces";
import { uploadRepo } from "../repositories";
import { FOLDER_IMG } from './../config/constantes'

export const catchError = (res: Response, error: String, code: number = 500) => {
  return res.status(code).json({
    status: false,
    error: { message: error },
  });
}

export const uploadFiled = async (
  files: Express.Multer.File[] | Express.Multer.File | true,
  directori: string = FOLDER_IMG):
  Promise<IUpload | IUpload[] | boolean> => {

  const directoriFormated = path.join(__dirname, '../../public/' + directori)
  let dataResponse: any = false;
  if (Array.isArray(files)) {
    dataResponse = []
    files.forEach(async (element) => {
      let oldPath = element.destination
      let newPath = directoriFormated + element.originalname
      let newData = {
        name: element.originalname,
        url: "/public/" + directori,
        type: element.mimetype,
        size: element.size
      }

      if (!fs.existsSync(directoriFormated)) {
        // Crea la carpeta si no existe
        fs.mkdirSync(directoriFormated);
        console.log(`Carpeta "${directoriFormated}" creada con éxito.`);
      }
      fs.rename(oldPath, newPath, async (err) => {
        if (err) {
          throw err
        }
        let data = await uploadRepo.create(newData)
        dataResponse.push(data)
        console.log('Successfully renamed - AKA moved!')
      })
    })

  } else if (typeof files === 'object') {
    let oldPath = files.destination
    let newPath = directoriFormated + files.originalname
    let newData = {
      name: files.originalname,
      url: "/public/" + directori,
      type: files.mimetype,
      size: files.size
    }
    if (!fs.existsSync(directoriFormated)) {
      // Crea la carpeta si no existe
      fs.mkdirSync(directoriFormated);
      console.log(`Carpeta "${directoriFormated}" creada con éxito.`);
    }
    fs.rename(oldPath, newPath, async (err) => {
      if (err) {
        throw err
      }
      let data = await uploadRepo.create(newData)
      dataResponse.push(data)
      console.log('Successfully renamed - AKA moved!')
    })
    // Puedes realizar acciones específicas para objetos aquí
  }
  return dataResponse;
}

export const passworBcrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(11);
  return bcrypt.hash(password, salt);
};

// funcion que compara los productos y sus cantidades en "oldData" con "newData"
export const equalOrders = (oldOrder: IOrders, newOrder: IOrdersUpdate): boolean => {
  if (!newOrder.products || oldOrder.products.length !== newOrder.products.length) return false;
  for (let i = 0; i < oldOrder.products.length; i++) {
    if (oldOrder.products[i].product._id !== newOrder.products[i].product._id ||
      oldOrder.products[i].quantity !== newOrder.products[i].quantity) {
      return false;
    }
  }
  return true;
}