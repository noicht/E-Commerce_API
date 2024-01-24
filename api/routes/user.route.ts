import { Router } from "express";
import { validateSchemaMiddleware } from "../middleware";
import { createUserSchema, deletedMultipleUsers } from "../schemas";
import { userController } from "../controllers";
import { checkAuth } from "../middleware";

const userRouter: Router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              surname:
 *                  type: string
 *              email:
 *                  type: string
 *              phone:
 *                  type: string
 *              password:
 *                  type: string
 *              role:
 *                  type: string
 *          required:
 *              - name
 *              - surname
 *              - email
 *              - phone
 *              - password
 *              - role
 *
 *          example:
 *              - name: Martin
 *              - surname: Cabrera
 *              - email: mcabrera@email.com
 *              - phone: 1550252071
 *              - password: qwertyuiop123
 *              - role: admin
 */

userRouter.get("/", checkAuth([1, 2, 3]), userController.getAllUsers);
userRouter.get("/:id", checkAuth([1, 2, 3]), userController.getUserById);
userRouter.post("/",checkAuth([3]),validateSchemaMiddleware(createUserSchema),userController.createUser);
userRouter.post("/create", userController.createUserFront);
userRouter.put("/", checkAuth([3]), userController.updateUser);
userRouter.delete("/", checkAuth([3]), userController.deleteUser);
userRouter.delete("/multiple",checkAuth([3]),validateSchemaMiddleware(deletedMultipleUsers),userController.deleteMultipleUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     tags: [User]
 *     summary: Crea un usuario.
 *     parameters:
 *       - in: path
 *         name: data
 *         required: true
 *         description: Crear user con data ingresada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario.
 *               surname:
 *                 type: string
 *                 description: Apellido del usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               role:
 *                 type: string
 *                 description: Rol del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado con éxito.
 *       500:
 *         description: Usuario ya existe o error al crearlo.
 */

/**
 * @swagger
 * /user/create:
 *  post:
 *      summary: Crea un usuario en el front.
 *      parameters:
 *       - in: path
 *         name: data
 *         required: true
 *         description: Crear user en el front con data ingresada.
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Crear user en front.
 *          404:
 *              description: User no encontrado.
 *          500:
 *              description: User ya existe.
 */

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Obtiene todos los usuarios.
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Obtener users.
 *          500:
 *              description: No se encontraron users.
 */

/**
 * @swagger
 * /user:
 *   put:
 *     tags: [User]
 *     summary: Modifica un usuario por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario que se desea modificar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario.
 *               surname:
 *                 type: string
 *                 description: Nuevo apellido del usuario.
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario.
 *               phone:
 *                 type: string
 *                 description: Nuevo número de teléfono del usuario.
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *               role:
 *                 type: string
 *                 description: Nuevo rol del usuario.
 *     responses:
 *       200:
 *         description: Usuario modificado con éxito.
 *       500:
 *         description: Usuario no encontrado o error al modificarlo.
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     tags: [User]
 *     summary: Elimina un usuario por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario que se desea eliminar.
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *       500:
 *         description: Usuario no encontrado o error al eliminarlo.
 */

/**
 * @swagger
 * /user:
 *   delete:
 *     tags: [User]
 *     summary: Elimina multiples usuario por sus IDs.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: IDs del usuario que se desea eliminar.
 *     responses:
 *       200:
 *         description: Usuarios eliminados con éxito.
 *       500:
 *         description: Usuarios no encontrados o error al eliminarlos.
 */

export { userRouter };
