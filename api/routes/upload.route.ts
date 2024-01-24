import { Router } from 'express';
import { uploadController } from '../controllers';
import { upload } from "./../config/multer";
import { checkAuth } from '../middleware';

const uploadRoute: Router = Router();

uploadRoute.get("/",checkAuth([1,2,3]), uploadController.getUpload);
uploadRoute.post("/",checkAuth([1,2,3]),upload.any(),uploadController.createUpload);

/**
 * @swagger
 * /upload:
 *   get:
 *     summary: Obtener información sobre la carga.
 *     tags: [Upload]
 *     responses:
 *       200:
 *         description: Información de carga obtenida con éxito.
 *       500:
 *         description: Error del servidor.

 *   post:
 *     summary: Subir un archivo.
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir.
 *     responses:
 *       201:
 *         description: Archivo subido con éxito.
 *       400:
 *         description: Solicitud incorrecta o archivo no válido.
 *       500:
 *         description: Error del servidor.
 */


export { uploadRoute };