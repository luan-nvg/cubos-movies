import { z } from "zod";
export const editProfileSchema = z.object({
  email: z.string().email({ message: "Formato invalido" }),
  username: z.string(),
});

export type EditProfileSchemaProps = z.infer<typeof editProfileSchema>;
