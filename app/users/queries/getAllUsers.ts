import db from "db"

const getAllUsers = () => {
  return db.user.findMany({
    select: { id: true, name: true, email: true },
  })
}

export default getAllUsers
