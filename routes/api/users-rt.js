const exppress = require("express");
const router = exppress.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Todo } = require("../../models");
const auth = require("../../middleware/auth");
require("dotenv").config();

// POST
// Register a new user
router.post("/", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    const user2 = await User.findOne({ where: { username } });

    if (user || user2) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      first_name,
      last_name,
      username,
      email,
      password,
    });

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 }, // change to 3600 for production
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// GET
// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// GET
// Authenticated Route
// Find a user by id, and display all todos
// router.get("/:uuid", async (req, res) => {
//   const { uuid } = req.params;
//   try {
//     const user = await User.findOne({
//       where: { uuid },
//       include: "todos",
//     });
//     return res.json(user);
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Server Error");
//   }
// });

router.get("/auth", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: "todos",
    });
    return res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
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
    console.error(e.message);
    res.status(500).send("Server Error");
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
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
