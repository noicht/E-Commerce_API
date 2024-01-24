import { z } from "zod";
import { ObjectId } from "mongodb";
const { object, string, array, number } = z;

export const createProductsSchema = object({
  body: object({
    name: string({
      required_error: "El nombre del producto es requerido.",
    }),
    description: string({
      required_error: "La descripción del producto es requerida.",
    }),
    category: string({
      required_error: "La categoría del producto es requerida.",
    }),
    price: z.number({
      required_error: "El precio del producto es requerido.",
    }),
    images: array(string({
      required_error: "La imagen del producto es requerida.",
    })),
    stock: z.number({
      required_error: "El stock del producto es requerido.",
    }),
    bulk: object({
      quantity_prod: number().refine((value) => {
        return value !== undefined; // Hacer que quantity_prod sea requerido
      }, { message: "quantity_prod es requerido." }),
      price: number().refine((value) => {
        return value !== undefined; // Hacer que price sea requerido
      }, { message: "price es requerido." })
    }),
    size: string({
      required_error: "El size del producto es requerido.",
    }),

  }),
});

const objectIdTransformer = z.string().transform((val) => {
  try {
    return new ObjectId(val);
  } catch (e) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        message: "Input not instance of ObjectId",
        path: [],
      },
    ]);
  }
});

export const updateProducts = z.object({
  body: z.object({
    id: objectIdTransformer,
    name: string({
      required_error: "El nombre del producto es requerido.",
    }).optional(),
    description: string({
      required_error: "La descripción del producto es requerida.",
    }).optional(),
    category: string({
      required_error: "La categoría del producto es requerida.",
    }).optional(),
    price: z
      .number()
      .refine((value) => value >= 0, {
        message: "El precio del producto no puede ser negativo.",
      })
      .optional(),
    image: string({
      required_error: "La imagen del producto es requerida.",
    }).optional(),
    stock: z
      .number({
        required_error: "El stock del producto es requerido.",
      })
      .optional(),
    isPublished: z
      .boolean({
        required_error: "",
      })
      .optional(),
    stockAvailable: z
      .boolean({
        required_error: "El Estock disponible del producto es requerido.",
      })
      .optional(),
    discount: z
      .number({
        required_error: "El Descuento del producto es requerido.",
      })
      .optional(),
    size: z
      .string({
        required_error: "El size del producto es requerido.",
      })
      .optional(),
  }),
});

export const deletedProduct = z.object({
  body: z.object({
    id: objectIdTransformer,
  }),
});

export const deletedMultipleProduct = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
