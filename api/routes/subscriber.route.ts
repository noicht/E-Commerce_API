
import { Router } from 'express'
import { checkAuth, validateSchemaMiddleware } from '../middleware';
import { deletedMultipleSubscribers, subscriberSchema } from '../schemas';
import { subscriberController } from '../controllers';

const subscriberRouter: Router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Subscriber:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico del suscriptor.
 *       required:
 *         - email
 */


subscriberRouter.get('/', subscriberController.getAllSubscriber);
subscriberRouter.post('/', validateSchemaMiddleware(subscriberSchema), subscriberController.createSubscriber);

subscriberRouter.delete("/multiple",checkAuth([2, 3]),validateSchemaMiddleware(deletedMultipleSubscribers), subscriberController.deleteMultipleSubscribers);

/**
 * @swagger
 * /subscribers:
 *   get:
 *     summary: Obtiene todos los suscriptores.
 *     tags: [Subscribers]
 *     responses:
 *       200:
 *         description: Lista de suscriptores obtenida con éxito.
 *       500:
 *         description: Error del servidor.
 *
 *   post:
 *     summary: Crea un nuevo suscriptor.
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       201:
 *         description: Suscriptor creado con éxito.
 *       400:
 *         description: Solicitud incorrecta o datos de suscriptor no válidos.
 *       500:
 *         description: Error del servidor.
 *
 * /subscribers/multiple:
 *   delete:
 *     summary: Elimina lógicamente varios suscriptores.
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeletedMultipleSubscribers'
 *     responses:
 *       200:
 *         description: Suscriptores eliminados lógicamente con éxito.
 *       400:
 *         description: Solicitud incorrecta (por ejemplo, IDs inválidos).
 *       404:
 *         description: Suscriptores no encontrados.
 *       500:
 *         description: Error del servidor.
 */



export { subscriberRouter };