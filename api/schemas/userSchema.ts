import { z } from "zod";
const { object, string } = z;

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "El nombre del usuario es requerido",
    }).nonempty("El email es requerido."),
    surname: string({
      required_error: "El apellido del usuario es requerido",
    }).nonempty("El email es requerido."),
    email: string({
      required_error: "El email del usuario es requerido",
    }).nonempty("El email es requerido."),
    phone: string({
      required_error: "El telefono del usuario es requerido",
    }).nonempty("El email es requerido."),
    password: string({
      required_error: "La contrasenia del usuario es requerida",
    }).nonempty("El email es requerido."),
    role: string({
      required_error: "El usuario debe tener un rol establecido",
    }),
  }),
});

export const deletedMultipleUsers = z.object({
  body: z.object({
    ids: z.array(z.string())
  })
})