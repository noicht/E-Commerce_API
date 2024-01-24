import { connect } from "mongoose";
import { DB_URI } from "./constantes";

const dbConnect = async ():Promise<void> => {
    try{
        console.log(DB_URI)
        await connect(DB_URI)
        console.log("Se inicializo la Base de datos");
    }catch(error){
        throw error;
    }
};

export default dbConnect;