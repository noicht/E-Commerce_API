import { z } from "zod";
import { ObjectId } from "mongodb";
const { object, string } = z;

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

export const createClientSchema = object({
    body: object({
        name: string({
            required_error: "The client's name is required.",
        }),
        businessName: string({
            required_error: "The business Name is required.",
        }),
        cuit: string({
            required_error: "The client's CUIT is required.",
        }),
        phone: z.string({
            required_error: "The client's phone number is required.",
        }),
        address: string({
            required_error: "Customer address is required.",
        }),
        debt: z.number({
            required_error: "Debt is required.",
        }),
        code: z.string({
            required_error: "Customer code is required.",
        }),
    }),
});

export const updateClientSchema = z.object({
    body: z.object({
        id: objectIdTransformer,
        name: string({
            required_error: "The client's name is required.",
        }).optional(),
        businessName: string({
            required_error: "The business Name is required.",
        }).optional(),
        cuit: string({
            required_error: "The client's CUIT is required.",
        }).optional(),
        phone: z.string({
            required_error: "The client's phone number is required.",
        }).optional(),
        address: string({
            required_error: "Customer address is required.",
        }).optional(),
        debt: z.number({
            required_error: "Debt is required.",
        }).optional(),
        code: z.string({
            required_error: "Customer code is required.",
        }).optional(),
    }),
});

export const deletedClientSchema = z.object({
    body: z.object({
        id: objectIdTransformer
    })
})