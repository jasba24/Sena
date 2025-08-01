const jwt = require('jsonwebtoken')

// Middleware para extraer el ID de usuario desde el token JWT
const userExtractor = (req, res, next) => {
  try {
    const authorization = req.get('authorization')

    if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'authorization header missing or malformed' })
    }

    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken?.id) {
      return res.status(401).json({ error: 'token invalid or missing user ID' })
    }

    req.userId = decodedToken.id
    next()
  } catch (error) {
    return res.status(401).json({ error: 'token verification failed' })
  }
}

module.exports = userExtractor
