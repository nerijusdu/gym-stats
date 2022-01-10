import { NotFoundError, resolver } from "blitz"
import db from "db"
import { UpdateGroup } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateGroup),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const users = await db.user.findMany({
      where: { email: { in: data.users.map((u) => u.email) } },
    })
    const group = await db.group.findFirst({
      where: { id },
      include: {
        users: { select: { id: true, email: true } },
      },
    })
    if (!group) throw new NotFoundError()

    const removedUsers = group.users.filter((u) => !data.users.find((u2) => u2.email === u.email))

    return await db.group.update({
      where: { id },
      data: {
        ...data,
        users: {
          connect: users.map((u) => ({ id: u.id })),
          disconnect: removedUsers.map((u) => ({ id: u.id })),
        },
      },
      select: {
        id: true,
        name: true,
        users: {
          select: { id: true, email: true },
        },
        period: true,
        periodType: true,
      },
    })
  }
)
