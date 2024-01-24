import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { routes } from "./routes";
import { swaggerSpec } from "./config/swagger";
import { ROUTE_PUBLIC_INDEX } from "./config/constantes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/", routes);
app.use("/public", express.static(path.join(__dirname, ROUTE_PUBLIC_INDEX)));
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

export { app };