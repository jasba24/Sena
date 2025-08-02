const imagesRouter = require("express").Router()
const Image = require("../models/Image")
const UserExtractor = require("../middleware/UserExtractor")
const multer = require("multer")

const storage = multer.memoryStorage()
const upload = multer({ storage })

imagesRouter.get("/", async (req, res) => {
  const images = await Image.find({})
  res.json(images)
})

imagesRouter.get("/:id", (req, res, next) => {
  const id = req.params.id
  Image.findById(id)
    .then((image) => {
      if (image) {
        res.json(image)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

imagesRouter.delete("/:id", UserExtractor, async (req, res) => {
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

imagesRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file
    const newImage = new Image({
      name: originalname,
      data: buffer,
      contentType: mimetype,
    })

    await newImage.save()
    res.status(200).json({ message: "Imagen subida correctamente" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al subir la imagen", details: error.message })
  }
})

module.exports = imagesRouter
