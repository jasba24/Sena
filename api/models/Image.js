const { Schema, model } = require("mongoose")

const ImageSchema = new Schema({
  name: String,
  data: { type: Buffer, required: true },
  contentType: String,
  category: { type: String, required: true },
})

module.exports = model("Image", ImageSchema)
