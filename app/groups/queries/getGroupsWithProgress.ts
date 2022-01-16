import { resolver } from "blitz"
import db, { Group } from "db"

type GroupWithProgress = Group & {
  progressCount: number;
  username: string;
};

type GroupWithUsers = Group & {
  users: {
    name: string;
    progressCount: number;
  }[];
}

export default resolver.pipe(
  resolver.authorize(),
  async (_, ctx) => {
    const groups = await db.$queryRaw<GroupWithProgress[]>`
      SELECT g.id, g.name, g."iterationEndDate", g."iterationId", count(gp.id) as "progressCount", u.name as username
      FROM "Group" g
      LEFT JOIN "_JoinedGroups" jg ON g.id = jg."A"
      LEFT JOIN "GroupProgress" gp ON g.id = gp."groupId" AND g."iterationId" = gp.iteration
      LEFT JOIN "User" u ON gp."userId" = u.id
      WHERE g."ownerId" = ${ctx.session.userId} OR jg."B" = ${ctx.session.userId}
      GROUP BY g.id, g.name, g."iterationEndDate", g."iterationId", u.name
    `;

    const groupsWithUsers = groups.reduce((acc, group) => {
      const users = acc[group.id]?.users ?? [];
      acc[group.id] = { ...group, users: [...users, { name: group.username, progressCount: group.progressCount }] };
      return acc;
    }, {} as { [key: string]: GroupWithUsers });

    return Object.values(groupsWithUsers).map(group => {
      group.users = group.users.sort((a, b) => b.progressCount - a.progressCount);
      return group;
    });
  }
)
