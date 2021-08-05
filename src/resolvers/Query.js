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

const bucket = (parent, { id }, { prisma }) => {
  return prisma.bucket.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

async function buckets(parent, args, context) {
  
  const { prisma, userId } = context;

  return prisma.bucket.findMany({
    where: {
      ownerId: userId
    }
  })
}

async function bucketAmount(parent, args, context) {
  const { id } = args;
  const { prisma } = context;

  let bucketAmount = 0;

  const bucketTransactions = await prisma.bucket.findUnique({
    where: {
      id: parseInt(id)
    }
  }).transactions()

  bucketTransactions.forEach( t => bucketAmount += t.amount );

  return bucketAmount;
}

const transaction = (parent, { id }, { prisma }) => {
  return prisma.bucket.findUnique({
    where: {
      id: parseInt(id)
    }
  })
}

async function transactions(parent, args, context) {
  const { prisma, userId } = context;

  const userTransactions = await prisma.transaction.findMany({
    where: {
      ownerId: userId
    }
  })

  return userTransactions;
}

module.exports = {
  info,
  users,
  user,
  bucket,
  buckets,
  bucketAmount,
  transaction
}