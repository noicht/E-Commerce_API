import { Router } from "express";
import { productsController } from "../controllers";
import { validateSchemaMiddleware } from "../middleware";
import {
  createProductsSchema,
  updateProducts,
  deletedProduct,
  deletedMultipleProduct,
} from "../schemas";
import { checkAuth } from "../middleware";

const productRoute: Router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: Schema.Types.ObjectId
 *         price:
 *           type: number
 *         size:
 *           type: string
 *         images:
 *           type: [string]
 *         stock:
 *           type: number
 *         isDeleted:
 *           type: boolean
 *         isPublished:
 *           type: boolean
 *         stockAvailable:
 *           type: boolean
 *         discount:
 *           type: number
 *         bar_code:
 *           type: string
 *         bulk:
 *           type: object
 *           properties:
 *             quantity_prod:
 *               type: number
 *             price:
 *               type: number
 *       required:
 *         - name
 *         - description
 *         - category
 *         - price
 *         - imagen
 *         - stock
 *         - isPublished
 *         - stockAvailable
 *         - discount
 *         - bar_code
 *         - bulk
 *       example:
 *         name: "Cheetos"
 *         description: "Palitos De Maíz Cheetos Queso 151g."
 *         category:
 *           _id: "category_id_here"
 *           name: "Snacks"
 *           description: "Frituras"
 *         price: 1.2
 *         images: "https://jumboargentina.vtexassets.com/arquivos/ids/767566-1200-auto?v=638113162870670000&width=1200&height=auto&aspect=true"
 *         stock: 3000
 *         isDeleted: false
 *         isPublished: true
 *         stockAvailable: true
 *         discount: 20
 *         bar_code: "D9989SW9999QAP"
 *         bulk:
 *          quantity_prod: 6
 *          price: 1
 */

/**
 * @swagger
 * /products:
 *  get:
 *      summary: Retorna todos los productos.
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Productos encontrados.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Products'
 *          400:
 *              description: Peticion incorrecta.
 *          404:
 *              description: Productos no encontrados.
 *          500:
 *              description: Error del servidor.
 */
productRoute.get("/",productsController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      summary: Devuelve un producto por ID.
 *      tags: [Products]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: the product id
 *      responses:
 *          200:
 *              description: Producto por ID encontrado.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#/components/schemas/Products'
 *          400:
 *              description: Petición incorrecta (por ejemplo, ID erroneo).
 *          404:
 *              description: Producto no encontrado.
 *          500:
 *              description: Error del servidor.
 */
productRoute.get("/:id"/*, checkAuth([2, 3])*/, productsController.getProductsById);

/**
 * @swagger
 * /products:
 *  post:
 *      summary: Crea un nuevo producto.
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Products'
 *      responses:
 *          200:
 *              description: Producto creado correctamente.
 *          400:
 *              description: Petición incorrecta (por ejemplo, falta algun campo requerido).
 *          404:
 *              description: Pagina no encontrada.
 *          500:
 *              description: Error del servidor.
 */
productRoute.post("/",checkAuth([2, 3]),validateSchemaMiddleware(createProductsSchema),productsController.createProducts);

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Actualiza uno o varios campos del producto.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       400:
 *         description: Peticion incorrecta (por ejemplo, ID faltante o formato de datos mal ingresados.)
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */
productRoute.put("/",checkAuth([2, 3]),validateSchemaMiddleware(updateProducts),productsController.updateProducts);

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Borra logicamente un producto.
 *     tags: [Products]
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
 *         description: Producto borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */
productRoute.delete("/",checkAuth([2, 3]),validateSchemaMiddleware(deletedProduct),productsController.deleteProduct);

/**
 * @swagger
 * /products/multiple:
 *   delete:
 *     summary: Borra logicamente multiples productos.
 *     tags: [Products]
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
 *         description: Producto borrado.
 *       400:
 *         description: Petición incorrecta (por ejemplo, ID erroneo).
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error del servidor.
 */

productRoute.delete("/multiple",checkAuth([2, 3]),validateSchemaMiddleware(deletedMultipleProduct),productsController.deleteMultipleProducts);

/**
 * @swagger
 * /top10BestSold:
 *   get:
 *     summary: Obtiene los 10 productos más vendidos.
 *     description: Devuelve una lista de los productos más vendidos.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la lista de productos más vendidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   totalQuantitySold:
 *                     type: number
 *                 required:
 *                   - _id
 *                   - totalQuantitySold
 *               example:
 *                 - _id: "64df8dddd1ec4b1c620cf6b9"
 *                   totalQuantitySold: 100
 *                 - _id: "64df8dddd1ec4b1c620cf6ba"
 *                   totalQuantitySold: 90
 *                 # Agrega más ejemplos según sea necesario
 *       500:
 *         description: Error del servidor.
 */


productRoute.get("/top10BestSold", productsController.getSales);
export { productRoute };
