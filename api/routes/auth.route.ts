import { Router } from 'express'
import { validateSchemaMiddleware } from '../middleware';
import { authController } from '../controllers';
import { createAuthSchema } from '../schemas';

const authRouter: Router = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Loguea un usuario creado.
 *     tags: [Auth]
*     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Correo electrónico del usuario.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: Contraseña del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       200:
 *         description: Login user.
 *       500:
 *         description: El usuario o la contraseña son inválidos.
 */
authRouter.post('/', validateSchemaMiddleware(createAuthSchema), authController.authController);

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña.
 *     tags: [Auth]
 *     parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: Correo electrónico del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *     responses:
 *       200:
 *         description: Se ha enviado un correo electrónico de restablecimiento de contraseña.
 *       500:
 *         description: No se pudo procesar la solicitud de restablecimiento de contraseña.
 */

authRouter.post('/forgotPassword',/*validateSchemaMiddleware(createAuthSchema),*/ authController.forgotPassword);
/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     summary: Cambiar la contraseña del usuario.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               oldPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario.
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *     responses:
 *       200:
 *         description: La contraseña se ha cambiado con éxito.
 *       400:
 *         description: La solicitud es incorrecta o faltan parámetros.
 *       401:
 *         description: La contraseña actual es incorrecta.
 *       500:
 *         description: No se pudo cambiar la contraseña.
 */


authRouter.post('/changePassword',/*validateSchemaMiddleware(createAuthSchema),*/ authController.changePassword);

export { authRouter };