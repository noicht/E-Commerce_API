import jwt from "jsonwebtoken";
import { Jwt, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ERoles } from './../interfaces'
import { userRepo } from "../repositories";

export const checkAuth = (requiredRole: ERoles[] | null = null) => {
  return (req: Request, res: Response, next: NextFunction) => {

    // Extraer encabezado de autorización
    const authHeader = req.get("Authorization");


    // Extraiga el token y busque el token
    const token = authHeader?.split(" ")[1];
    if (!token || token === "") {
      return res.status(401).send({
        status: false,
        error: { message: "INVALID TOKEN" },
      });
    }

    //Verificar el token extraído
    let decodedToken: Jwt | null;
    decodedToken = jwt.decode(token, { complete: true });

    try {
      jwt.verify(token, process.env.JWT_SECRET as string, async (err) => {
        if (err) {
          return res.status(401).send({
            status: false,
            error: { message: err.message },
          });
        } else {
          if (!decodedToken) {
            return res.status(401).send({
              status: false,
              error: { message: "INVALID TOKEN" },
            });
          }
          const data_user_validate = (decodedToken as JwtPayload).payload;

          const validateUser = await userRepo.findByMail(data_user_validate.user.email);

          if (!validateUser) {
            return res.status(401).send({
              status: false,
              error: { message: "INVALID TOKEN" },
            });
          }

          if (requiredRole !== null) {
            if (requiredRole.includes(data_user_validate.user.role.code)) {
              req.user = validateUser;
              next();
            } else {
              return res.status(401).send({
                status: false,
                error: { message: "INVALID PERMISSIONS" },
              });
            }
          } else {
            req.user = validateUser;
            next();
          }
        }
      });
    } catch (err) {
      return res.status(401).send({
        status: false,
        error: { message: "INVALID TOKEN" },
      });
    }
  };
};

