import { Router } from 'express'
import { userAccessController } from '../controllers';
import { checkAuth } from '../middleware';

const userAccessRouter: Router = Router();

/**
 * @swagger
 * /user-access/{id}:
 *   get:
 *     summary: Obtener un User Access por ID.
 *     tags: [UserAccess]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del User Access que se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User  encontrado.
 *       404:
 *         description: User  no encontrado.
 *       500:
 *         description: Error al obtener el User.
 */

userAccessRouter.get('/:id', checkAuth([2, 3]), userAccessController.getUserAccessByIdController);

export { userAccessRouter };