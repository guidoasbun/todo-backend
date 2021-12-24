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

// DELETE
// Delete a todo by id
router.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const todo = await Todo.findOne({ where: { uuid } });
    await todo.destroy();
    return res.json({ message: "Todo deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

//UPDATE
// Update a todo by id
router.put("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { task, completed, image } = req.body;

  try {
    const todo = await Todo.findOne({ where: { uuid } });
    await todo.update({ task, completed, image });
    return res.json(todo);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

module.exports = router;
