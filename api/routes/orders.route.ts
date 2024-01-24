import { Router } from "express";
import { ordersController } from "../controllers";
import { validateSchemaMiddleware } from "../middleware";
import { orderSchema, updateOrders } from "../schemas";
import { checkAuth } from "../middleware";

const orderRoute: Router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       properties:
 *         clientid:
 *           type: string
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Products'
 *         status:
 *           type: string
 *           enum: ['create', 'approved', 'completed', 'cancelled']
 *         totalPrice:
 *           type: number
 */

/**
 * @swagger
 * /orders:
 *  get:
 *      summary: Retorna todas las ordenes.
 *      tags: [Orders]
 *      responses:
 *          200:
 *              description: Ordenes encontradas.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Orders'
 *          400:
 *              description: Peticion incorrecta.
 *          404:
 *              description: Ordenes no encontradas.
 *          500:
 *              description: Error del servidor.
 */
orderRoute.get("/", checkAuth([1,2, 3]),ordersController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      summary: Devuelve una orden por ID.
 *      tags: [Orders]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the order id
 *      responses:
 *          200:
 *              description: Orden por ID encontrada.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Orders'
 *          400:
 *              description: Petición incorrecta (por ejemplo, ID erroneo).
 *          404:
 *              description: Orden no encontrada.
 *          500:
 *              description: Error del servidor.
 */
orderRoute.get("/:id", checkAuth([1,2, 3]), ordersController.getOrdersById);

/**
 * @swagger
 *   /orders:
 *     post:
 *       summary: Crea una nueva orden.
 *       tags: [Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - clientid
 *                 - products
 *               properties:
 *                 clientid:
 *                   type: string
 *                   example: "12345"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - quantity
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64df93d790f96594fde4f01d"
 *                       quantity:
 *                         type: number
 *                         example: 75
 *       responses:
 *         201:
 *           description: Orden creada correctamente.
 *         400:
 *           description: Datos de la orden incorrectos.
 *         500:
 *           description: Error del servidor.
 */
orderRoute.post("/",checkAuth([2, 3]),validateSchemaMiddleware(orderSchema),ordersController.createOrders);

/**
 * @swagger
 * /orders:
 *     put:
 *       summary: Actualiza una orden existente, restaura el valor de stock anterior y descuenta del nuevo producto que se agrega.
 *       tags: [Orders]
 *       parameters:
 *         - in: path
 *           name: orderId
 *           required: true
 *           schema:
 *             type: string
 *           description: ID de la orden a actualizar
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *                 - clientid
 *                 - products
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64e7b7f81ea1b0228bd37ee1"
 *                 clientid:
 *                   type: string
 *                   example: "12345"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required:
 *                       - id
 *                       - quantity
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "64df8f11d1ec4b1c620cf6bf"
 *                       quantity:
 *                         type: number
 *                         example: 1499
 *       responses:
 *         200:
 *           description: Orden actualizada correctamente.
 *         400:
 *           description: Datos de la orden incorrectos.
 *         404:
 *           description: Orden no encontrada.
 *         500:
 *           description: Error del servidor.
 */
orderRoute.put("/", checkAuth([2, 3]), validateSchemaMiddleware(updateOrders), ordersController.updateOrder);

/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Elimina una orden existente.
 *     tags: [Orders]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Orden eliminada correctamente.
 *       404:
 *         description: Orden no encontrada.
 *       500:
 *         description: Error del servidor.
 */

orderRoute.delete("/", checkAuth([2, 3]),  ordersController.deleteOrder);

export { orderRoute };
