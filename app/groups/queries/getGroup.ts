import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetGroup = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetGroup), resolver.authorize(), async ({ id }, ctx) => {
  const group = await db.group.findFirst({
    where: {
      id,
      OR: [
        {
          users: { some: { id: ctx.session.userId } }
        },
        {
          ownerId: ctx.session.userId,
        }
      ]
    },
    select: {
      id: true,
      name: true,
      users: {
        select: { id: true, name: true, email: true },
      },
      period: true,
      periodType: true,
      iterationStartDate: true,
      iterationEndDate: true,
      endOfPeriod: true,
      ownerId: true,
    },
  })

  if (!group) throw new NotFoundError()

  return group
})
