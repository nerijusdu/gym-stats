import { resolver } from "blitz"
import db from "db"
import { UpdateGroup } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateGroup),
  resolver.authorize(),
  async ({ id, ...data }) => {
    return await db.group.update({ where: { id }, data })
  }
)
