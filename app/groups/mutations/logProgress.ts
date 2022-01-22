import { resolver, NotFoundError } from "blitz";
import dayjs from "dayjs";
import db from "db";
import { GroupIdentification } from "../validations";

export default resolver.pipe(resolver.zod(GroupIdentification), resolver.authorize(), async (input, ctx) => {
  const group = await db.group.findFirst({
    where: { id: input.groupId},
    include: {
      users: {
        where: { id: ctx.session.userId },
        select: { id: true, email: true }
      },
    }
  });

  if (!group?.users.length && group?.ownerId !== ctx.session.userId) {
    throw new NotFoundError("Couldn't find group. Make sure the owner has assigned you to the group.");
  }

  if (dayjs(group?.iterationEndDate).isBefore(dayjs())) {
    throw new Error("You cannot log progress for an iteration that has already ended.");
  }

  const lastLog = await db.groupProgress.findFirst({
    where: {
      userId: ctx.session.userId,
      groupId: input.groupId,
      iteration: group.iterationId
    },
    select: {
      createdAt: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  if (lastLog?.createdAt && dayjs(lastLog.createdAt).isSame(dayjs(), "day")) {
    throw new Error("You have already logged progress for this iteration today.");
  }

  const progress = await db.groupProgress.create({
    data: {
      group: {
        connect: { id: group.id }
      },
      user: {
        connect: { id: ctx.session.userId }
      },
      iteration: group.iterationId
    }
  });

  return progress;
});
