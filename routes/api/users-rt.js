const exppress = require("express");
const router = exppress.Router();
const { User, Todo } = require("../../models");

// POST
// Register a new user
router.post("/", async (req, res) => {
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

// GET
// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// GET
// Find a user by id, and display all todos
router.get("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({
      where: { uuid },
      include: "todos",
    });
    return res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// DELETE
// Delete a user by id
router.delete("/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ where: { uuid } });
    const todos = await Todo.findAll({ where: { userId: user.id } });
    
    await user.destroy();
    await todos.forEach((todo) => todo.destroy());
    
    return res.json({ message: "User deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

//UPDATE
// Update a user by id
router.put("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { first_name, last_name, username, email, password } = req.body;
  try {
    const user = await User.findOne({ where: { uuid } });
    await user.update({
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
})

module.exports = router;
