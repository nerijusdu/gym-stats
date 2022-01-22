import { resolver, NotFoundError } from "blitz";
import dayjs from "dayjs";
import db from "db";
import { LogProgress } from "../validations";

const getAddress = async (latitude, longitude) => {
  const url = `http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITIONSTACK_API_KEY}&query=${latitude},${longitude}&output=json&limit=1`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data[0].label;
};

export default resolver.pipe(resolver.zod(LogProgress), resolver.authorize(), async (input, ctx) => {
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

  let location;
  if (input.latitude && input.longitude) {
    location = await getAddress(input.latitude, input.longitude);
  }

  const progress = await db.groupProgress.create({
    data: {
      group: {
        connect: { id: group.id }
      },
      user: {
        connect: { id: ctx.session.userId }
      },
      iteration: group.iterationId,
      location: location
    }
  });

  return progress;
});
