const { Schema, model } = require("mongoose")

const CategorySchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
  },
})

module.exports = model("Category", CategorySchema)
