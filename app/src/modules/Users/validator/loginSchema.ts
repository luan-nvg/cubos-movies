import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email não pode ser vazio" })
    .email({ message: "Formato invalido" }),
  password: z.string().min(1, { message: "Email não pode ser vazio" }),
});

export type LoginSchemaProps = z.infer<typeof loginSchema>;
