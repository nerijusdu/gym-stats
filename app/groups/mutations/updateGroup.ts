import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateGroup = z.object({
  id: z.string(),
  name: z.string().regex(/^[a-zA-Z0-9 ]+$/),
})

export default resolver.pipe(
  resolver.zod(UpdateGroup),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const group = await db.group.update({ where: { id }, data })

    return group
  }
)
