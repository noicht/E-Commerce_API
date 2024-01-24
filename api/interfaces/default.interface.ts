import { JwtPayload } from "jsonwebtoken";
import { Orders, Products } from "../models";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | null | string;
    }
  }
}

export interface paginationParams {
  page: number;
  quantity: number;
}

export interface paginationResponse {
  page: number;
  quantity: number;
  cantTotal: number;
  totalPages: number;
}
export interface paginationQueryParams {
  skip: number;
  limit: number;
  sort?: Record<string, number>;

}

export interface ISortOptions {
  [key: string]: 1 | -1; // Puedes ajustar los valores según tus necesidades
}
