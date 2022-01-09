import { z } from "zod"

export const CreateGroup = z.object({
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/, "Name must be alphanumeric."),
})

export const UpdateGroup = z.object({
  id: z.string(),
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/),
})
