import { ISize } from "../interfaces";
import { sizeRepo } from "../repositories";


export const getSizesServices =async():Promise<ISize[]>=>{
    const sizes: ISize[] = await sizeRepo.find();
    return sizes;
}