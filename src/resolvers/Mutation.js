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
  createUser,
  updateUser,
  deleteUser
}
