import { z } from "zod";
const { object, string } = z;

export const createCategorySchema = object({
  body: object({
    name: string({
      required_error: "The category name is required.",
    }),
    description: string({
      required_error: "Category description is required.",
    }),
  }),
});