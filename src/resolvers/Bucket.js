const owner = (parent, args, { prisma }) => {

  return prisma.bucket.findUnique({
    where: {
      id: parent.id
    }
  }).owner()

}

const transactions = (parent, args, { prisma }) => {

  return prisma.bucket.findUnique({
    where: {
      id: parent.id
    }
  }).transactions();

}

module.exports = {
  owner,
  transactions
}