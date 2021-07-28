async function createUser(parent, { firstName, lastName, email }, { prisma } ) {

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  const newUser = await prisma.user.create({ data: user })

  return newUser

}

async function updateUser (parent, args, { prisma }) {

  let updatedData;

  // args.firstName ? updatedUser.firstName = args.firstName : null
  // args.lastName ? updatedUser.lastName = args.lastName : null
  // args.email ? updatedUser.email = args.email : null

  if (args.firstName && args.lastName && args.email) {
    updatedData = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email
    }
  }

  // need to build other conditionals and / or find better way to modify updatedData object

  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(args.id)
    },
    data: updatedData
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
  createUser,
  updateUser,
  deleteUser
}
