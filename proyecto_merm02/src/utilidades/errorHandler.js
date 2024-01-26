export const notFoundErrorHandler = (req, res, next) => {

  res.status(404).json({
    message: "Ruta no encontrada",
    url: req.originalUrl,
    method: req.method,
    requestBody: req.body
  })
}
