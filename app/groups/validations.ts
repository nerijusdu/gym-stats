import { z } from "zod"

export const CreateGroup = z.object({
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric."),
  users: z.array(z.object({ email: z.string().email() })),
  period: z.number(),
  periodType: z.enum(["WEEK", "MONTH", "YEAR"]),
  iterationStartDate: z.date().optional(),
  endOfPeriod: z.boolean().optional(),
})

export const UpdateGroup = z.object({
  id: z.string(),
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric."),
  users: z.array(z.object({ email: z.string().email() })),
  period: z.number(),
  periodType: z.enum(["WEEK", "MONTH", "YEAR"]),
  iterationStartDate: z.date().optional(),
  endOfPeriod: z.boolean().optional(),
})

export const GroupIdentification = z.object({
  groupId: z.string(),
});

export const LogProgress = z.object({
  groupId: z.string(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});
