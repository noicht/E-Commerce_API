import multer from 'multer';
import path from "path";
import { ROUTE_PUBLIC_FOLDER } from './constantes';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, ROUTE_PUBLIC_FOLDER))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

export { upload }