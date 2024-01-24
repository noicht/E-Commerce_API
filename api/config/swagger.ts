import path from "path";
import { API_URL,PROJECT_NAME } from "./constantes";

export const swaggerSpec: any = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: PROJECT_NAME,
            version: "1.0.0"
        },
        servers: [{
            url: API_URL
        }]
    },
    apis: [`${path.join(__dirname, "../routes/*.js")}`]
}
