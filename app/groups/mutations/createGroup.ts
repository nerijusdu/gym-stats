import { resolver } from "blitz"
import db from "db"
import { CreateGroup } from "../validations"
import dayjs from "dayjs"

export default resolver.pipe(
  resolver.zod(CreateGroup),
  resolver.authorize(),
  async (input, ctx) => {
    const users = await db.user.findMany({
      where: { email: { in: input.users.map((u) => u.email) } },
    })

    const iterationStartDate = dayjs(input.iterationStartDate)
    const iterationEndDate = iterationStartDate.add(
      input.period,
      input.periodType.toLocaleLowerCase()
    )

    return await db.group.create({
      data: {
        id: input.name.toLowerCase().replace(/\s/g, "-"),
        name: input.name,
        period: input.period,
        periodType: input.periodType,
        iterationStartDate: iterationStartDate.toDate(),
        iterationEndDate: iterationEndDate.toDate(),
        endOfPeriod: input.endOfPeriod,
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
