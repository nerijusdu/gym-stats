import { NotFoundError, resolver } from "blitz";
import dayjs, { OpUnitType } from "dayjs";
import db from "db";
import { GroupIdentification } from "../validations";


export default resolver.pipe(
  resolver.zod(GroupIdentification),
  resolver.authorize(),
  async ({ groupId }, ctx) => {
    const group = await db.group.findFirst({
      where: {id: groupId, ownerId: ctx.session.userId}
    });

    if (!group) {
      throw new NotFoundError("Couldn't find group. Only the owner of the group can start an iteration.");
    }

    if (dayjs(group.iterationEndDate).isAfter(dayjs())) {
      throw new Error("You cannot start an iteration that has not ended.");
    }

    let iterationStartDate = dayjs()
    let iterationEndDate = iterationStartDate.add(group.period, group.periodType.toLocaleLowerCase())
    if (group.endOfPeriod) {
      iterationEndDate = iterationEndDate
        .startOf(group.periodType.toLocaleLowerCase() as OpUnitType)
        .add(-1, "day")
    }

    return await db.group.update({
      where: {id: groupId},
      data: {
        iterationStartDate: iterationStartDate?.toDate(),
        iterationEndDate: iterationEndDate?.toDate(),
        iterationId: group.iterationId + 1
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
      }
    });
  });
