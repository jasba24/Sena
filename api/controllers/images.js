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
  const id = req.params.id
  await Image.findByIdAndRemove(id)
  res.status(204).end()
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
