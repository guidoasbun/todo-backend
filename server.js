const express = require("express");

const { sequelize } = require("./models");

const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("Hello World!"));

// User routes 
app.use("/api/v1/users", require("./routes/api/users-rt"));

// Todos routes
app.use("/api/v1/todos", require("./routes/api/todos-rt"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Connected with database");
});
