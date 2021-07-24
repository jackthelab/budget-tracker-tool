const express = require('express');
const router = express.Router();
const app = express();

const jsonParser = express.json();

// home route
app.get('/', (req, res) => {
  res.send("Hello Budgeters!");
});

// user routes

// get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({})
  res.json(users);
})

// create user
app.post('/users', jsonParser, async (req, res) => {

  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email
      }
    });
  
    res.json(user);

  } catch {
    console.log(req.body);
  }
  
})
