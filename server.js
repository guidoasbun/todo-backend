const express = require("express");

const { sequelize } = require("./models");

const app = express();

//Middleware
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/users", require("./routes/api/users"));

app.listen({ port: 5000 }, async () => {
  console.log("Server started on port 5000");
  await sequelize.sync({ force: true });
  console.log("Synced with database");
});
