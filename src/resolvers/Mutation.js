const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');
const APP_SECRET = process.env.APP_SECRET;

async function signUp(parent, args, { prisma } ) {

  const password = await bcrypt.hash(args.password, 10)

  const newUser = {
    ...args,
    password
  }

  const user = await prisma.user.create({ data: newUser })

  const token = jwt.sign({ userId: newUser.id }, APP_SECRET)

  const firstBucket = await prisma.bucket.create({
    data: {
      owner: { connect: { id: user.id } },
      name: `${user.firstName}'s First Fund`,
      goalAmount: 1000,
      currentAmount: 0,
      recurring: false,
      emergency: false,
    }
  })

  return {
    token,
    user
  }

}

async function login(parent, args, { prisma }) {

  const user = await prisma.user.findUnique({
    where: {
      email: args.email
    }
  })

  if(!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if(!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }

}

async function updateUser (parent, args, { prisma }) {

  let updatedUserData = {};

  args.firstName ? updatedUserData.firstName = args.firstName : null
  args.lastName ? updatedUserData.lastName = args.lastName : null
  args.email ? updatedUserData.email = args.email : null

  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(args.id)
    },
    data: updatedUserData
  })

  return updateUser
}

async function deleteUser(parent, { id }, { prisma }) {
  
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(id)
    }
  })
}

// need to work on this... not sure why it's not picking up userId right now
async function createBucket(parent, args, context) {
  const { userId, prisma } = context;

  const newBucket = await prisma.bucket.create({
    data: {
      owner: { connect: { id: userId } },
      name: args.name,
      goalAmount: args.goalAmount,
      recurring: args.recurring || false,
      emergency: args.emergency || false,
    }
  })

  if(args.startAmount) {
    const firstTransaction = await prisma.transaction.create({
      data: {
        owner: { connect: { id: userId } },
        bucket: { connect: { id: newBucket.id } },
        expense: false,
        amount: args.startAmount,
        reason: "Initial Deposit"
      }
    })
  }

  return newBucket

}

async function updateBucket(parent, args, context) {
  
  const { prisma } = context

  let updateBucketData = {}

  args.name ? updateBucketData.name = args.name : null
  args.goalAmount ? updateBucketData.goalAmount = args.goalAmount : null
  args.recurring ? updateBucketData.recurring = args.recurring : null
  args.emergency ? updateBucketData.emergency = args.emergency : null

  const updateBucket = await prisma.bucket.update({
    where: {
      id: parseInt(args.id)
    },
    data: updateBucketData
  })

  return updateBucket;

}

async function deleteBucket(parent, args, context) {
  const { prisma } = context

  const deleteBucket = await prisma.bucket.delete({
    where: {
      id: parseInt(args.id)
    }
  })

  return `You've deleted ${deleteBucket.name}`

}

async function createTransaction(parent, args, context) {
  const { prisma, userId } = context;

  let modifiedAmount = args.amount

  if(args.expense) {
    modifiedAmount *= -1;
  }

  const newTransaction = await prisma.transaction.create({
    data: {
      owner: { connect: { id: userId } },
      bucket: args.bucketId ? { connect: { id: parseInt(args.bucketId) } } : null,
      expense: args.expense || true,
      amount: modifiedAmount,
      reason: args.reason
    }
  });

  return newTransaction

}

async function deleteTransaction(parent, args, context) {
  const { prisma } = context;

  const deletedTransaction = await prisma.transaction.delete({
    where: {
      id: parseInt(args.id)
    }
  })

  return `You've deleted a ${deletedTransaction.withdraw ? 'withdraw' : 'deposit'} of $${deletedTransaction.amount}`
}

module.exports = {
  signUp,
  login,
  updateUser,
  deleteUser,
  createBucket,
  updateBucket,
  deleteBucket,
  createTransaction,
  deleteTransaction
}
