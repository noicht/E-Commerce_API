import { Router } from 'express';
import { adminController } from '../controllers';
import { checkAuth } from '../middleware';
const adminRouter: Router = Router();
/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Dashboard general de deudores y ventas diarias.
 *     tags: 
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               dailySell:
 *                 wholesale: 0
 *                 retail: 0
 *               debtorsClients:
 *                 - clientId: "6503716fb93e5a186c3a8c7d"
 *                   name: "holala"
 *                   debt: 123122223
 *                 - clientId: "650371b6b93e5a186c3a8c7e"
 *                   name: "1"
 *                   debt: 123122223
 *                 - clientId: "650371c1b93e5a186c3a8c7f"
 *                   name: "2"
 *                   debt: 123122223
 *                 - clientId: "65037233b93e5a186c3a8c80"
 *                   name: "2"
 *                   debt: 123122223
 *                 - clientId: "65032cb3e94c4da9d80d9526"
 *                   name: "ho"
 *                   debt: 123123
 *               stockProducts: []
 *               bestSellingProducts: []
 */


adminRouter.get("/dashboard",checkAuth([2,3]), adminController.getDashboardController);

export { adminRouter };