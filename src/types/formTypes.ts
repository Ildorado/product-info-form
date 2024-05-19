import { z } from "zod";

export const schema = z.object({
  productTitle: z.string().min(1, "Product title is required"),
  productDescription: z.string().optional(),
  productBullets: z.array(z.object({ value: z.string().min(1, "Bullet cannot be empty") })).optional(),
  productKeywords: z.array(z.string()).optional(),
});

export type FormData = z.infer<typeof schema>;

export interface SelectOption {
  label: string;
  value: string;
}
