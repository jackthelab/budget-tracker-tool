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

module.exports = {
  signUp,
  login,
  updateUser,
  deleteUser,
}
