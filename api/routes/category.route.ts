import { Router } from 'express'
import { validateSchemaMiddleware } from '../middleware';
import { createCategorySchema } from '../schemas';
import { categoryController } from '../controllers';
import { checkAuth } from '../middleware';

const categoryRouter: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Categories:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              descripcion:
 *                  type: string
 *          required:
 *              - name
 *              - descripcion
 *          example:
 *              name: "Snacks"
 *              descripcion: "Frituras"
 */

categoryRouter.get('/', categoryController.getAllCategory);
categoryRouter.get('/:id', validateSchemaMiddleware(createCategorySchema), categoryController.getCategoryById);
categoryRouter.post('/', checkAuth([2, 3]), validateSchemaMiddleware(createCategorySchema), categoryController.createCategory);
categoryRouter.put('/:id', checkAuth([2, 3]), validateSchemaMiddleware(createCategorySchema), categoryController.updateCategory);
categoryRouter.delete('/', checkAuth([2, 3]), categoryController.deleteCategory);

export { categoryRouter };

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     summary: Crea una categoría.
 *     parameters:
 *       - in: path
 *         name: data
 *         required: true
 *         description: Crear categoria con data ingresada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la categoría.
 *               description:
 *                 type: string
 *                 description: Descripción de la categoría.
 *     responses:
 *       200:
 *         description: Categoría creada con éxito.
 *       500:
 *         description: Error al crear la categoría.
 */

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Obtiene una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría que se desea obtener.
 *     responses:
 *       200:
 *         description: Categoría encontrada.
 *       500:
 *         description: No se encontró la categoría.
 */


/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: Obtiene todas las categorías.
 *     responses:
 *       200:
 *         description: Muestra todas las categorías encontradas.
 *       500:
 *         description: No se encontraron categorías.
 */


/**
 * @swagger
 * /category:
 *   put:
 *     tags: [Category]
 *     summary: Modifica una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría que se desea modificar.
 *       - in: path
 *         name: datatoupdate
 *         required: true
 *         description: Data modificada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la categoría que se desea modificar.
 *               name:
 *                 type: string
 *                 description: Nuevo nombre de la categoría.
 *               description:
 *                 type: string
 *                 description: Nueva descripción de la categoría.
 *     responses:
 *       200:
 *         description: Categoría modificada con éxito.
 *       500:
 *         description: No se encontró la categoría o error al modificarla.
 */


/**
 * @swagger
 * /category:
 *   delete:
 *     tags: [Category]
 *     summary: Elimina una categoría por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID de la categoría que se desea eliminar.
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito.
 *       500:
 *         description: No se encontró la categoría o error al eliminarla.
 */
