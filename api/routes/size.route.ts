import { Router } from 'express'
// import { validateSchemaMiddleware } from '../middleware';
// import { createCategorySchema } from '../schemas';
import { sizeController } from '../controllers';


const sizeRouter: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Size:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *          required:
 *              - name
 *          example:
 *              name: "Snacks"
 */

sizeRouter.get('/', sizeController.getSizes);

export { sizeRouter };