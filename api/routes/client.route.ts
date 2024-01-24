import { Router } from "express";
import { clientController } from "../controllers";
import { validateSchemaMiddleware } from "../middleware";
import {
  createClientSchema,
  updateClientSchema,
  deletedClientSchema,
} from "../schemas";
import { checkAuth } from "../middleware";

const clientRoute: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Clients:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              businessName:
 *                  type: string
 *              cuit:
 *                  type: string
 *              phone:
 *                  type: string
 *              address:
 *                  type: string
 *              debt:
 *                  type: number
 *              code:
 *                  type: string
 *          required:
 *              - name
 *              - businessName
 *              - cuit
 *              - phone
 *              - address
 *              - debt
 *              - code
 *          example:
 *              name: "Juan Perez"
 *              businessName: "perezjuan"
 *              cuit: "11-22333444-5"
 *              phone: "5556677"
 *              address: "Av. del Libertador 6550"
 *              debt: 0
 *              code: "112233"
 */

/**
 * @swagger
 * /client:
 *  get:
 *      summary: Retorna todos los clientes.
 *      tags: [Client]
 *      responses:
 *          200:
 *              description: Clientes encontrados.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Clients'
 *          400:
 *              description: Peticion incorrecta.
 *          404:
 *              description: Clientes no encontrados.
 *          500:
 *              description: Error del servidor.
 */
clientRoute.get("/",checkAuth([2,3]), clientController.getClient);

/**
 * @swagger
 * /client/{id}:
 *  get:
 *      summary: Devuelve un cliente por ID.
 *      tags: [Client]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the client id
 *      responses:
 *          200:
 *              description: Cliente por ID encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Clients'
 *          400:
 *              description: Petición incorrecta (por ejemplo, ID erroneo).
 *          404:
 *              description: Cliente no encontrado.
 *          500:
 *              description: Error del servidor.
 */
clientRoute.get("/:id", checkAuth([2, 3]), clientController.getClientById);

/**
 * @swagger
 * /client:
 *  post:
 *      summary: Crea un nuevo cliente.
 *      tags: [Client]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Clients'
 *      responses:
 *          200:
 *              description: Cliente creado correctamente.
 *          400:
 *              description: Petición incorrecta (por ejemplo, falta algun campo requerido).
 *          404:
 *              description: Pagina no encontrada.
 *          500:
 *              description: Error del servidor.
 */
clientRoute.post("/", checkAuth([2, 3]),validateSchemaMiddleware(createClientSchema),clientController.createClient);

/**
 * @swagger
 * /client:
 *   put:
 *     summary: Actualiza uno o varios campos del cliente.
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64f5c3f8e0f58de464edc4da"
 *               name:
 *                 type: string
 *                 example: "Juan Carlos Batman"
 *               businessName:
 *                 type: string
 *                 example: "batman"
 *               cuit:
 *                 type: string
 *                 example: "123456789"
 *               phone:
 *                 type: string
 *                 example: "1122334455"
 *               address:
 *                 type: string
 *                 example: "Ciudad Gotica"
 *               debt:
 *                 type: number
 *                 example: 1234567890
 *               code:
 *                 type: string
 *                 example: "codigo1"
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente.
 *       400:
 *         description: Peticion incorrecta (por ejemplo, ID faltante o formato de datos mal ingresados.)
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error del servidor.
 */
clientRoute.put("/",checkAuth([2, 3]),validateSchemaMiddleware(updateClientSchema),clientController.updateClient);

/**
 * @swagger
 * /client:
 *   delete:
 *     summary: Borra logicamente un cliente.
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64f5c3f8e0f58de464edc4da"
 *     responses:
 *       200:
 *         description: Cliente borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: CLiente no encontrado.
 *       500:
 *         description: Error del servidor.
 */
clientRoute.delete("/",checkAuth([2, 3]),validateSchemaMiddleware(deletedClientSchema),clientController.deleteClient);

export { clientRoute };
