import { z } from "zod"

export const CreateGroup = z.object({
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric."),
  users: z.array(z.object({ email: z.string().email() })),
  period: z.number(),
  periodType: z.enum(["WEEK", "MONTH", "YEAR"]),
})

export const UpdateGroup = z.object({
  id: z.string(),
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric."),
  users: z.array(z.object({ email: z.string().email() })),
  period: z.number(),
  periodType: z.enum(["WEEK", "MONTH", "YEAR"]),
})
