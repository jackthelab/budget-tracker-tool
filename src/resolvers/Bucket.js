const owner = (parent, args, { prisma }) => {
  return context.prisma.bucket.findUnique({
    where: {
      id: parent.id
    }
  }).owner()
}

module.exports = {
  owner,
}