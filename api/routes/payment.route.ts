import { Router } from "express";
import { paymentController } from "../controllers";
import { validateSchemaMiddleware } from "../middleware";
import {
  createPaymentSchema,
  updatePaymentSchema,
  deletedPaymentSchema,
  deletedMultiplePayment,
} from "../schemas";
import { checkAuth } from "../middleware";

const paymentRoute: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          properties:
 *              orderId:
 *                  type: string
 *              amount:
 *                  type: number
 *          example:
 *              orderId: "64ef78adf6e7a6f81db8c298"
 *              amount: 4
 *
 *      Payments:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              client:
 *                  type: string
 *              date:
 *                  type: string
 *              total:
 *                  type: number
 *              paymentMethod:
 *                  type: string
 *              orders:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Order'
 *          required:
 *              - client
 *              - date
 *              - total
 *              - paymentMethod
 *              - orders
 *          example:
 *              client: "64f76ed7c6cf83283d687732"
 *              date: "2023-09-05"
 *              total: 11
 *              paymentMethod: "MASTERCARD"
 *              orders:
 *                  - orderId: "64ef78adf6e7a6f81db8c298"
 *                    amount: 4
 */

/**
 * @swagger
 * /payment:
 *  get:
 *      summary: Retorna todos los payments.
 *      tags: [Payment]
 *      responses:
 *          200:
 *              description: Payments encontrados.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Payments'
 *          400:
 *              description: Peticion incorrecta.
 *          404:
 *              description: Payments no encontrados.
 *          500:
 *              description: Error del servidor.
 */
paymentRoute.get("/",checkAuth([2,3]),paymentController.getPayment);

/**
 * @swagger
 * /payment/{id}:
 *  get:
 *      summary: Devuelve un payment por ID.
 *      tags: [Payment]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the payment id
 *      responses:
 *          200:
 *              description: Payment por ID encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Payments'
 *          400:
 *              description: Petición incorrecta (por ejemplo, ID erroneo).
 *          404:
 *              description: Payment no encontrado.
 *          500:
 *              description: Error del servidor.
 */
paymentRoute.get("/:id", checkAuth([2, 3]), paymentController.getPaymentById);

/**
 * @swagger
 * /payment:
 *  post:
 *      summary: Crea un nuevo payment.
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Payments'
 *      responses:
 *          200:
 *              description: Payment creado correctamente.
 *          400:
 *              description: Petición incorrecta (por ejemplo, falta algun campo requerido).
 *          404:
 *              description: Pagina no encontrada.
 *          500:
 *              description: Error del servidor.
 */
paymentRoute.post("/",checkAuth([2, 3]),validateSchemaMiddleware(createPaymentSchema),paymentController.createPayment);

/**
 * @swagger
 * /payment:
 *   put:
 *     summary: Actualiza uno o varios campos del Payment.
 *     tags: [Payment]
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
 *               name:
 *                 type: string
 *               businessName:
 *                 type: string
 *               cuit:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               debt:
 *                 type: number
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment actualizado correctamente.
 *       400:
 *         description: Peticion incorrecta (por ejemplo, ID faltante o formato de datos mal ingresados.)
 *       404:
 *         description: Payment no encontrado.
 *       500:
 *         description: Error del servidor.
 */
//paymentRoute.put("/",checkAuth([2, 3]),validateSchemaMiddleware(updatePaymentSchema),paymentController.updatePayment);

/**
 * @swagger
 * /payment:
 *   delete:
 *     summary: Borra logicamente un Payment.
 *     tags: [Payment]
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
 *                 example: "64f770f7f3052d76ee6d9038"
 *     responses:
 *       200:
 *         description: Payment borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: Payment no encontrado.
 *       500:
 *         description: Error del servidor.
 */
paymentRoute.delete("/",checkAuth([2, 3]),validateSchemaMiddleware(deletedPaymentSchema),paymentController.deletePayment);

/**
 * @swagger
 * /payment:
 *   delete:
 *     summary: Borra logicamente multiples Payments.
 *     tags: [Payment]
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
 *                 example: "64f770f7f3052d76ee6d9038"
 *     responses:
 *       200:
 *         description: Payment borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: Payment no encontrado.
 *       500:
 *         description: Error del servidor.
 */

paymentRoute.delete("/multiple",checkAuth([2, 3]),validateSchemaMiddleware(deletedMultiplePayment),paymentController.deleteMultiplePayments);

export { paymentRoute };
