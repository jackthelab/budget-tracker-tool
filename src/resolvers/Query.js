const info = () => {
  return "This is a budget tool GraphQL API"
}

const users = (parent, args, { prisma }, info) => {
  return prisma.user.findMany()
}

const user = (parent, { id }, { prisma }, info) => {
  return prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

module.exports = {
  info,
  users,
  user
}