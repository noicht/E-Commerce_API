import * as dotenv from "dotenv";
dotenv.config();

export const MAX_FILE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const PORT = process.env.API_PORT || 4000;
export const DB_URI = <string> process.env.DB_URI
export const API_URL=process.env.API_URL
export const FOLDER_IMG=<string>process.env.FOLDER_IMG
export const JWT_SECRET = <string>process.env.JWT_SECRET
export const TIME_OUT = <string>process.env.TIME_OUT
export const PROJECT_NAME = <string>process.env.PROJECT_NAME
export const EMAIL_USER = <string>process.env.EMAIL_USER
export const EMAIL_PASSWORD = <string>process.env.EMAIL_PASSWORD
export const ROUTE_PUBLIC_INDEX = <string>process.env.ROUTE_PUBLIC_INDEX
export const ROUTE_PUBLIC_FOLDER = <string>process.env.ROUTE_PUBLIC_FOLDER 
