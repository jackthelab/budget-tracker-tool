const owner = (parent, args, { prisma }) => {
  return prisma.transaction.findUnique({
    where: {
      id: parent.id
    }
  }).owner();
}

module.exports = {
  owner
}