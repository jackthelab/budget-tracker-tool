const owner = (parent, args, { prisma }) => {

  return prisma.bucket.findUnique({
    where: {
      id: parent.id
    }
  }).owner()
}

module.exports = {
  owner,
}