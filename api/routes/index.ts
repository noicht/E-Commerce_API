import { Router } from 'express';
import { adminRouter } from './admin.route';
import { authRouter } from './auth.route';
import { categoryRouter } from './category.route';
import { clientRoute } from './client.route';
import { orderRoute } from './orders.route';
import { paymentRoute } from './payment.route';
import { productRoute } from './products.route';
import { retailRouter } from './retail.route';
import { roleRoute } from './role.route';
import { uploadRoute } from './upload.route';
import { userRouter } from './user.route';
import { userAccessRouter } from './userAccess.route';
import { subscriberRouter } from './subscriber.route';
import {sizeRouter} from './size.route'





const routes: Router = Router();

routes.use("/admin", adminRouter);
routes.use("/auth", authRouter);
routes.use("/category", categoryRouter);
routes.use("/client", clientRoute);
routes.use("/orders", orderRoute);
routes.use("/payment", paymentRoute);
routes.use("/products", productRoute);
routes.use("/retail", retailRouter);
routes.use("/role", roleRoute);
routes.use("/upload", uploadRoute);
routes.use("/user", userRouter);
routes.use("/userAccess", userAccessRouter);
routes.use("/subscriber", subscriberRouter);
routes.use("/sizes",sizeRouter)


export { routes };