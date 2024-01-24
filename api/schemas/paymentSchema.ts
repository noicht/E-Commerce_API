import { z } from "zod";
import { ObjectId } from "mongodb";
const { object } = z;

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

export const createPaymentSchema = object({
    body: object({
        clientId: z.string()
            .nonempty("The client is required.")
            .regex(/^[a-f\d]{24}$/i, "Invalid ID format"), // validamos que sea un ObjectId valido.
        date: z.string()
            .nonempty("The date is required."),
        total: z.number()
            .nonnegative("The total of is required.").min(1, "Quantity must be greater than 0."),
        paymentMethod: z.string()
            .nonempty("The paymentMethod is required.")
    }),
});

export const updatePaymentSchema = object({
    body: object({
        client: z.string()
            .nonempty("The client is required.")
            .optional(),
        date: z.string()
            .nonempty("The date is required.")
            .optional(),
        total: z.number()
            .nonnegative("The total of is required.").min(1, "Quantity must be greater than 0.")
            .optional(),
        paymentMethod: z.string()
            .nonempty("The paymentMethod is required.")
            .optional()
    }),
});

export const deletedPaymentSchema = z.object({
    body: z.object({
        id: objectIdTransformer
    })
})

export const deletedMultiplePayment = z.object({
  body: z.object({
    ids: z.array(z.string())
  })
})