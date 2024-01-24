import { z } from "zod";
const { object, string } = z;

export const subscriberSchema = object({
    body: object({
        email: string({
            required_error: "Email is required.",
        }).email()
    }),
});

export const deletedMultipleSubscribers = z.object({
  body: z.object({
    ids: z.array(z.string())
  })
})