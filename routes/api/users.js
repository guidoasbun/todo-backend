const exppress = require("express");
const router = exppress.Router();
const { User } = require("../../models");

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

module.exports = router;
