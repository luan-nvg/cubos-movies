import { z } from "zod";
export const changePasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email não pode ser vazio" })
      .email({ message: "Formato invalido" }),
    currentPwd: z.string().min(1, { message: "Senha atual não pode ser vazio" }),
    newPwd: z
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
      .min(8, { message: "Senha deve conter no minimo 8 caracters" }),
    repeatNewPwd: z.string(),
  })
  .refine((data) => data.newPwd === data.repeatNewPwd, {
    message: "Senhas não conferem",
    path: ["repeatNewPwd"],
  });

export type PasswordSchemaProps = z.infer<typeof changePasswordSchema>;


