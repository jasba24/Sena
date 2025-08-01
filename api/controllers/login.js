const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/User")

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body

    // Validación básica
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username y password son requeridos" })
    }

    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" })
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Contraseña incorrecta" })
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "7d", // Más legible
    })

    res.status(200).send({
      name: user.name,
      username: user.username,
      token,
    })
  } catch (error) {
    res.status(500).json({ error: "Error interno", details: error.message })
  }
})

module.exports = loginRouter