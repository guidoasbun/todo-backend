const exppress = require("express");
const router = exppress.Router();
const { User } = require("../../models");

// POST
// Create a new user
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
})

module.exports = router;
