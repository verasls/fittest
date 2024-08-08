import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  userId: z.string(),
  name: z
    .string()
    .min(2, { message: "O nome tem que ter pelo menos dois caracteres" }),
  email: z
    .string()
    .email({ message: "Endereço de email inválido" })
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      message: "Número de telefone inválido",
    })
    .or(z.literal("")),
  sex: z.enum(["Feminino", "Masculino", "Outro"], {
    message: "Por favor, escolha uma opção",
  }),
  dateOfBirth: z.date({ message: "Por favor, inclua uma data de nascimento" }),
});

export type Client = z.infer<typeof clientSchema>;

export const evaluationSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  clientId: z.string(),
  date: z.date({ message: "Por favor, inclua a data da avaliação" }),
});

export type Evaluation = z.infer<typeof evaluationSchema>;
