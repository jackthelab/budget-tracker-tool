async function info() {
  return await "This is a budget tool GraphQL API"
}

async function users(parent, args, { prisma }) {
  const users = await prisma.user.findMany()

  return users;
}

async function user(parent, { id }, { prisma }) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return user;
}

async function bucket(parent, { id }, { prisma }) {
  const bucket = await prisma.bucket.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return bucket;
}

async function buckets(parent, args, context) {
  
  const { prisma, userId } = context;

  const buckets = await prisma.bucket.findMany({
    where: {
      ownerId: userId
    },
    include: {
      transactions: true
    }
  })

  return buckets;
}

async function transaction (parent, { id }, { prisma }) {
  
  const transaction = await prisma.bucket.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  return transaction;
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
  transaction,
  transactions
}