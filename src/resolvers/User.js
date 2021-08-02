const buckets = (parent, args, context) => {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    }
  }).buckets()
}

const transactions = (parent, args, context) => {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    }
  }).transactions()
}

module.exports = {
  buckets,
  transactions
}