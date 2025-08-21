const { Schema, model, Types } = require("mongoose")

const ProductSchema = new Schema({
  name: String,
  category: String,
  price: String,
  image: { type: Types.ObjectId, ref: "Image" },
})

const OrderSchema = new Schema({
  products: { type: [ProductSchema], required: true },
  client: { type: String },
  date: { type: Date, required: true },
  status: { type: String, required: true },
})

module.exports = model("Order", OrderSchema)
