import { resolver } from "blitz"
import db from "db"
import { CreateGroup } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateGroup),
  resolver.authorize(),
  async (input, ctx) => {
    const users = await db.user.findMany({
      where: { email: { in: input.users.map((u) => u.email) } },
    })

    return await db.group.create({
      data: {
        id: input.name.toLowerCase().replace(/\s/g, "-"),
        name: input.name,
        users: {
          connect: users.map((u) => ({ id: u.id })),
        },
        owner: {
          connect: { id: ctx.session.userId },
        },
      },
    })
  }
)
