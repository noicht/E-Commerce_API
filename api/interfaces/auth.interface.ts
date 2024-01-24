import { IRole } from "./role.interface";

export interface IAuth{
    token:string
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: IRole;
}