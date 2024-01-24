import http from "http";
import { app } from "./api";
import db from "./api/config/mongo";
import { PORT } from "./api/config/constantes";

const main = async () => {
    await db();

    const httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {
        console.log(`API corriendo en el puerto ${PORT}.`);
    })
};

main()
    .then(() => {
        console.log("Se inicio el server.");
    })
    .catch((err) => {
        console.log(err);
    })