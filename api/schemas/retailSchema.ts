import { z } from "zod";
import { ObjectId } from "mongodb";
const { object, string } = z;

export const createRetailsSchema = object({
  body: object({
    name: string({
      required_error: "El nombre del Retail es requerido.",
    }),
    surname: string({
      required_error: "El apellido del Retail es requerida.",
    }),
    email: string({
      required_error: "El email del Retail es requerida.",
    }),
    phone: z.number({
      required_error: "El telefono del Retail es requerido.",
    }),
    address: string({
      required_error: "La direccion del Retail es requerida.",
    }),
  }),
});

const objectIdTransformer = z.string().transform(val => {
  try {
    return new ObjectId(val);
  } catch (e) {
    throw new z.ZodError([{
      code: z.ZodIssueCode.custom,
      message: 'Input not instance of ObjectId',
      path: []
    }]);
  }
});

export const updateRetails = z.object({
  body: z.object({
    id: objectIdTransformer,
    name: string({
      required_error: "El nombre del Retail es requerido.",
    }).optional(),
    surname: string({
      required_error: "La descripción del Retail es requerida.",
    }).optional(),
    email: string({
      required_error: "La categoría del Retail es requerida.",
    }).optional(),
    phone: z.number()
      .refine(value => value >= 0, {
        message: "El numero del Retail no puede ser negativo."
      }).optional(),
    address: string({
      required_error: "La direccion del Retail es requerida.",
    }).optional(),
  }),
});

export const deletedRetail = z.object({
  body: z.object({
    id: objectIdTransformer
  })
})