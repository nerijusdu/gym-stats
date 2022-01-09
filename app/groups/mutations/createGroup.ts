import { resolver } from "blitz"
import db from "db"
import { CreateGroup } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateGroup),
  resolver.authorize(),
  async (input, ctx) => {
    const group = await db.group.create({
      data: {
        name: input.name,
        id: input.name.toLowerCase().replace(/\s/g, "-"),
        ownerId: ctx.session?.userId,
      },
    })

    return group
  }
)
