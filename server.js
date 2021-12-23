const express = require("express");

const { sequelize, User } = require("./models");

const app = express();

//Middleware
app.use(express.json());

app.post("/users", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  try {
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    return res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen({ port: 5000 }, async () => {
  console.log("Server started on port 5000");
  await sequelize.sync({ force: true });
  console.log("Synced with database");
});
