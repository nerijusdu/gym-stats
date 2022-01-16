import { NotFoundError, resolver } from "blitz"
import db from "db"
import { UpdateGroup } from "../validations"
import dayjs from "dayjs"

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
    let iterationStartDate
    let iterationEndDate
    if (data.iterationStartDate) {
      iterationStartDate = dayjs(data.iterationStartDate)
      iterationEndDate = iterationStartDate.add(data.period, data.periodType.toLocaleLowerCase())
      if (data.endOfPeriod) {
        iterationEndDate = iterationEndDate
          .startOf(data.periodType.toLocaleLowerCase())
          .add(-1, "day")
      }
    }

    return await db.group.update({
      where: { id },
      data: {
        ...data,
        iterationStartDate: iterationStartDate?.toDate(),
        iterationEndDate: iterationEndDate?.toDate(),
        users: {
          connect: users.map((u) => ({ id: u.id })),
          disconnect: removedUsers.map((u) => ({ id: u.id })),
        },
      },
      select: {
        id: true,
        name: true,
        users: {
          select: { id: true, name: true, email: true },
        },
        owner: {
          select: { id: true, name: true },
        },
        period: true,
        periodType: true,
        iterationStartDate: true,
        iterationEndDate: true,
        endOfPeriod: true,
        ownerId: true,
      },
    })
  }
)
