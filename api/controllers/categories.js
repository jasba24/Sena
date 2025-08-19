const Category = require("../models/Category")
const categoriesRouter = require("express").Router()
const multer = require("multer")
const userExtractor = require("../middleware/UserExtractor")

const storage = multer.memoryStorage()
const upload = multer({ storage })

categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find()

    const formatted = categories.map((cat) => ({
      _id: cat._id,
      title: cat.title,
      category: cat.category,
      image: `data:${cat.image.contentType};base64,${cat.image.data.toString(
        "base64"
      )}`,
    }))

    res.status(200).json(formatted)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener categorías.", details: error.message })
  }
})

categoriesRouter.post(
  "/",
  userExtractor,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, category } = req.body
      const file = req.file

      if (!file)
        return res.status(400).json({ message: "No se recibió imagen." })

      const newCategory = new Category({
        title,
        category,
        image: {
          data: file.buffer,
          contentType: file.mimetype,
        },
      })

      await newCategory.save()
      res.status(201).json({
        message: "Categoría creada exitosamente.",
        data: {
          _id: newCategory._id,
          title: newCategory.title,
          category: newCategory.category,
          image: `data:${file.mimetype};base64,${file.buffer.toString(
            "base64"
          )}`,
        },
      })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear categoría.", details: error.message })
    }
  }
)

categoriesRouter.put(
  "/:id",
  userExtractor,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, category } = req.body
      const updates = { title, category }
      const file = req.file
      const id = req.params.id

      if (file) {
        updates.image = {
          data: file.buffer,
          contentType: file.mimetype,
        }
      }

      const updated = await Category.findByIdAndUpdate(id, updates, {
        new: true,
        rawResult: false,
      })

      const formatted = {
        _id: updated._id,
        title: updated.title,
        category: updated.category,
        image: `data:${
          updated.image.contentType
        };base64,${updated.image.data.toString("base64")}`,
      }

      res
        .status(200)
        .json({ message: "Categoría actualizada.", data: formatted })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al editar categoría.", details: error.message })
    }
  }
)

categoriesRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: "Categoría no encontrada." })
    }

    res.status(200).json({ message: "Categoría eliminada correctamente." })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar categoría.", details: error.message })
  }
})

module.exports = categoriesRouter
