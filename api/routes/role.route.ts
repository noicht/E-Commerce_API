import { Router } from 'express';
import { roleController } from '../controllers';
import { validateSchemaMiddleware } from '../middleware';
import { createRoleSchema } from '../schemas';
import { checkAuth } from '../middleware/checkAuth';

const roleRoute: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Role:
 *          type: object
 *          properties:
 *              _id:
 *                  type: Types.ObjectId
 *              name:
 *                  type: string
 *              code:
 *                  type: number
 *          required:
 *              - name
 *              - code
 *          example:
 *              name: "User"
 *              code: 1
 */

/**
 * @swagger
 * /role:
 *  get:
 *      summary: Retorna todos los roles.
 *      tags: [Role]
 *      responses:
 *          200:
 *              description: Roles encontrados.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Role'
 *          400:
 *              description: Peticion incorrecta.
 *          500:
 *              description: Error del servidor.
 */
roleRoute.get("/", checkAuth([2, 3]), roleController.getRole);

/**
 * @swagger
 * /role:
 *  post:
 *      summary: Crea un nuevo rol.
 *      tags: [Role]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Role'
 *      responses:
 *          200:
 *              description: Role creado correctamente.
 *          400:
 *              description: Petición incorrecta (por ejemplo, falta algun campo requerido)..
 *          500:
 *              description: Error del servidor.
 */
roleRoute.post("/", checkAuth([3]), validateSchemaMiddleware(createRoleSchema), roleController.createRole);

/**
 * @swagger
 * /role:
 *   put:
 *     summary: Actualiza uno o varios campos del rol.
 *     tags: [Role]
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
 *                 type: Types.ObjectId
 *                 example: "64dfaf42ee4450fac66043ce"
 *               name:
 *                 type: string
 *                 example: "User"
 *               code:
 *                 type: number
 *                 example: 1
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente.
 *       400:
 *         description: Peticion incorrecta (por ejemplo, ID faltante o formato de datos mal ingresados.)
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error del servidor.
 */
roleRoute.put("/", checkAuth([3]), roleController.uploadRole);

/**
 * @swagger
 * /role:
 *   delete:
 *     summary: Borra logicamente un rol.
 *     tags: [Role]
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
 *                 example: "64df8dddd1ec4b1c620cf6b9"
 *     responses:
 *       200:
 *         description: Rol borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: Rol no encontrado.
 *       500:
 *         description: Error del servidor.
 */
roleRoute.delete("/", checkAuth([3]), roleController.deleteRole);

export { roleRoute };