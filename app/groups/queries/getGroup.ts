import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetGroup = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetGroup), resolver.authorize(), async ({ id }) => {
  const group = await db.group.findFirst({
    where: { id },
    include: { users: { select: { id: true, email: true } } },
  })

  if (!group) throw new NotFoundError()

  return group
})
