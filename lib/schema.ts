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

export const selectClientSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  clientId: z.string().min(1, { message: "Por favor, selecione um cliente" }),
  date: z.date({ message: "Por favor, inclua a data da avaliação" }),
});

export type SelectClient = z.infer<typeof selectClientSchema>;

export const anamnesisSchema = z.object({
  practiceExercise: z.enum(["Sim", "Não"]),
  exerciseType: z.string(),
  exerciseFrequence: z.string(),
  exerciseDuration: z.string(),
  physicalActivityHistory: z.string(),
  objectives: z.string(),
  smoke: z.enum(["Sim", "Não, mas já fumei", "Nunca fumei"]),
  smokeQuantity: z.string(),
  smokeTimeSinceStop: z.string(),
  alcoholComsumption: z.enum(["Sim", "Não"]),
  alcoholQuantity: z.string(),
  sleepQuality: z.string(),
  stressLevel: z.string(),
  diseases: z.enum(["Sim", "Não"]),
  diseasesDetails: z.string(),
  diseasesFamilyHistory: z.enum(["Sim", "Não"]),
  diseasesFamilyHistoryDetails: z.string(),
  injuries: z.enum(["Sim", "Não"]),
  injuriesDetails: z.string(),
  surgeries: z.enum(["Sim", "Não"]),
  surgeriesDetails: z.string(),
  medication: z.enum(["Sim", "Não"]),
  medicationDetails: z.string(),
  pains: z.enum(["Sim", "Não"]),
  painsDetails: z.string(),
  physicalLimitations: z.enum(["Sim", "Não"]),
  physicalLimitationsDetails: z.string(),
});

export type Anamnesis = z.infer<typeof anamnesisSchema>;
