const express = require("express");
const router = express.Router();
const { User, Todo } = require("../../models");

// POST
// Create a new todo
// Must be logged in, authentication required
router.post("/", async (req, res) => {
  const { userUuid, task, completed, image } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUuid } });
    const todo = await Todo.create({ userId: user.id, task, completed, image });
    return res.json(todo);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// GET
// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll({
      include: "user", // Changes User to user, must associate with Todo model, if multiple, pass as array, include: [.....]
    });

    return res.json(todos);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
