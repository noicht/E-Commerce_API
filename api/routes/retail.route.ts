import { Router } from "express";
import { retailController } from "../controllers";
import { checkAuth } from "../middleware";

const retailRouter: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              surname:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              adresss:
 *                  type: string
 *              isDeleted:
 *                  type: boolean
 *          required:
 *              - name
 *              - surname
 *              - email
 *              - phone
 *              - address
 *              - isDeleted
 *
 *          example:
 *              - name: Martin
 *              - surname: Cabrera
 *              - email: mcabrera@email.com
 *              - phone: 1550252071
 *              - address: arenales
 *              - isDeleted: false
 */

retailRouter.get("/",checkAuth([2, 3]),retailController.getAllRetailController);
retailRouter.get("/:id",checkAuth([2, 3]),retailController.getRetailByIdController);
retailRouter.post("/", retailController.createRetailController);
retailRouter.put("/",checkAuth([2, 3]),retailController.updateRetailController);
retailRouter.delete("/",checkAuth([2, 3]),retailController.deleteRetailController);

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     summary: Crea un retail.
 *     parameters:
 *       - in: path
 *         name: data
 *         required: true
 *         description: Crear retail con data ingresada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del retail.
 *               surname:
 *                 type: string
 *                 description: Apellido del retail.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del retail.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del retail.
 *               address:
 *                 type: string
 *                 description: Direccion del retail.
 *               isDeleted:
 *                 type: boolean
 *                 description: Eliminado logico.
 *     responses:
 *       200:
 *         description: Retail creado con éxito.
 *       500:
 *         description: Error al crear retail
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Obtiene todos los retails.
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Obtener retails.
 *          500:
 *              description: No se encontraron retails.
 */

/**
 * @swagger
 * /user:
 *   put:
 *     tags: [User]
 *     summary: Modifica un usuario por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del retail que se desea modificar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del Retail.
 *               surname:
 *                 type: string
 *                 description: Nuevo apellido del Retail.
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del Retail.
 *               phone:
 *                 type: string
 *                 description: Nuevo número de teléfono del Retail.
 *               address:
 *                 type: string
 *                 description: Nueva direccion del Retail.
 *               isDeleted:
 *                 type: boolean
 *                 description: Nuevo estado del Retail.
 *     responses:
 *       200:
 *         description: Retail modificado con éxito.
 *       500:
 *         description: Retail no encontrado o error al modificarlo.
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     tags: [User]
 *     summary: Elimina un retail por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del retail que se desea eliminar.
 *     responses:
 *       200:
 *         description: Retail eliminado con éxito.
 *       500:
 *         description: Retail no encontrado o error al eliminarlo.
 */

export { retailRouter };
