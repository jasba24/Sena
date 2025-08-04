const userExtractor = require("../middleware/UserExtractor")
const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/User")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username y password son requeridos" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el usuario", details: error.message })
  }
})

usersRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "Usuario eliminado con éxito" })
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erorr al eliminar al usuario", details: error.message })
  }
})

module.exports = usersRouter
