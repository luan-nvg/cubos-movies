import { z } from "zod";
export const createUserSchema = z
  .object({
    username: z.string().min(1, { message: "Usuario não pode ser vazio" }),
    email: z
      .string()
      .min(1, { message: "Email não pode ser vazio" })
      .email({ message: "Formato invalido" }),
    profileUrl: z.string(),
    pwd: z
      .string()
      .regex(
        new RegExp(".*[A-Z].*"),
        "Senha deve possuir um caracater maiusculo"
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "Senha deve possuir um caracater minusculo"
      )
      .regex(new RegExp(".*\\d.*"), "Senha deve possuir um numero")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "Senha deve possuir um caracater especial"
      )
      .min(8, { message: "Senha deve conter no minimo 8 car" }),
    repeatPwd: z.string(),
  })
  .refine((data) => data.pwd === data.repeatPwd, {
    message: "Senhas não conferem",
    path: ["repeatPwd"],
  });

export type UserSchemaProps = z.infer<typeof createUserSchema>;
