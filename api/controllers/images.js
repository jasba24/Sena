const express = require("express")
const imagesRouter = require("express").Router()
const Image = require("../models/Image")
const multer = require("multer")
const userExtractor = require("../middleware/UserExtractor")

const storage = multer.memoryStorage()
const upload = multer({ storage })

imagesRouter.get("/", async (req, res) => {
  const images = await Image.find({})
  const formatted = images.map((img) => ({
    _id: img._id,
    name: img.name,
    category: img.category,
    contentType: img.contentType,
    data: Buffer.from(img.data).toString("base64"), // ← Aquí está la magia
  }))
  res.json(formatted)
})

imagesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id
  const image = await Image.findById(id)
    .then((image) => {
      if (image) {
        const formatted = {
          _id: image._id,
          name: image.name,
          category: image.category,
          contentType: image.contentType,
          data: Buffer.from(image.data).toString("base64"),
        }

        res.json(formatted)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

imagesRouter.get("/category/:category", async (req, res, next) => {
  const category = req.params.category
  console.log(category)

  try {
    const images = await Image.find({ category })
    const formatted = images.map((img) => ({
      _id: img._id,
      name: img.name,
      category: img.category,
      contentType: img.contentType,
      data: Buffer.from(img.data).toString("base64"), // ← Aquí está la magia
    }))
    res.json(formatted)
  } catch (error) {
    next(error)
  }
})

imagesRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const deleted = await Image.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: "Imagen no encontrada" })
    }

    res.status(200).json({ message: "Imagen eliminada correctamente" })
  } catch (err) {
    next(err)
  }
})

imagesRouter.delete("/", express.json(), userExtractor, async (req, res) => {
  const { ids } = req.body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ error: "Debes enviar un array de IDs válidos." })
  }

  try {
    const result = await Image.deleteMany({ _id: { $in: ids } })
    res.json({
      message: "Imágenes eliminadas correctamente.",
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("Error al eliminar imágenes:", error)
    res.status(500).json({ error: "Error interno al eliminar imágenes." })
  }
})

imagesRouter.post("/", upload.any(), async (req, res) => {
  try {
    const { category } = req.body
    const files = req.files || []

    if (files.length === 0) {
      return res.status(400).json({ message: "No se recibieron imágenes." })
    }

    const imageDocs = files.map((file) => ({
      name: file.originalname,
      data: file.buffer,
      contentType: file.mimetype,
      category,
    }))

    await Image.insertMany(imageDocs)

    res.status(200).json({
      message: "Imágenes subidas correctamente",
      count: imageDocs.length,
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al subir las imágenes",
      details: error.message,
    })
  }
})

module.exports = imagesRouter
