import { z } from "zod";
const { object, string } = z;

export const createRoleSchema = object({
  body: object({
    name: string({
      required_error: "The role name is required.",
    }),
    code: z.number({
      required_error: "The role code is required.",
    }),
  }),
});
