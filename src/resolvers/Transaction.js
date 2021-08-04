const owner = (parent, args, { prisma }) => {
  return prisma.transaction.findUnique({
    where: {
      id: parent.id
    }
  }).owner();
}

const bucket = (parent, args, { prisma }) => {
  return prisma.transaction.findUnique({
    where: {
      id: parent.id
    }
  }).bucket();
}

module.exports = {
  owner,
  bucket
}