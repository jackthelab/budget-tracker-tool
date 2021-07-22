require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const app = express();
const jsonParser = express.json();

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("Hello Budgeters!");
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({})
  res.json(users);
})

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

app.listen(port, () => {
  console.log(`Listening on port ${ port }`);
})