const { Schema, model } = require("mongoose")

const ImageSchema = new Schema({
  name: String,
  data: Buffer,
  contentType: String,
})

module.exports = model("Image", ImageSchema)
