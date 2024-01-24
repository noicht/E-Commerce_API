import { array, z } from 'zod';
import { ObjectId } from "mongodb";
const { object, string } = z;

// const objectIdTransformer = z.string().transform(val => {
//     try {
//         return new ObjectId(val);
//     } catch (e) {
//         throw new z.ZodError([{
//             code: z.ZodIssueCode.custom,
//             message: 'Input not instance of ObjectId',
//             path: []
//         }]);
//     }
// });

export const orderSchema = z.object({
    body: z.object({
        // client: z.union([
        //     z.string({
        //         required_error: "Customer number is required.",
        //     }),
        //     z.object({
        //         name: z.string()
        //             .min(1, "The name is required."),
        //         surname: z.string()
        //             .min(1, "Last name is required."),
        //         mail: z.string()
        //             .email("It must be a valid email."),
        //         tel: z.number()
        //             .min(1, "Telephone is required."),
        //         address: z.string()
        //             .min(1, "Address is required.")
        //     })
        // ]),
        products: z.array(z.object({
            id: z.string(),
            quantity: z.number().min(1, "Quantity must be greater than 0."),
            discount: z.number()
                .optional()
        })).refine((products) => products.length > 0, {
            message: "At least one product is required.",
        }),
    })
});

export const updateOrders = z.object({
    body: z.object({
        id: z.string(),
        // client: z.union([
        //     z.string({
        //         required_error: "Customer number is required.",
        //     }).optional(),
        //     z.object({
        //         name: z.string()
        //             .min(1, "The name is required.")
        //             .optional(),
        //         surname: z.string()
        //             .min(1, "Last name is required.")
        //             .optional(),
        //         mail: z.string()
        //             .email("It must be a valid email.")
        //             .optional(),
        //         tel: z.number()
        //             .min(1, "Telephone is required.")
        //             .optional(),
        //         address: z.string()
        //             .min(1, "Address is required.")
        //             .optional()
        //     })
        // ]),
        products: array(
            object({
                id: z.string(),
                quantity: z.number().min(1, "Quantity must be greater than 0."),
                discount: z.number().optional()
            })
        )
    }),
});