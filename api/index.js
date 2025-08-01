require("dotenv").config()
require("./mongo")
const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const NotFound = require("./middleware/NotFound")
const HandlerError = require("./middleware/HandlerError")


const app = express()
app.use(express.json())
app.use(cors())
app.use(logger)
app.use(NotFound)
app.use(HandlerError)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)

module.exports = { app, server }
