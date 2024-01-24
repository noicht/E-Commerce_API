import { z } from "zod";
const { object, string } = z;

export const getUserAccessSchema = object({
  body: object({
    rol: string({
      required_error: "The user role is required.",
    })
  }),
});