import { z } from "zod";
const { object, string } = z;

export const createAuthSchema = object({
  body: object({
    email: string({
      required_error: "Email is required.",
    }).nonempty("Email is required."),
    password: string({
      required_error: "Category description is required.",
    }).nonempty("Email is required."),
  }),
});