import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

const authRequire = (req, res, next) => {

    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      // Suponiendo que el token se envía como "Bearer <token>"
      token = req.headers.authorization.split(' ')[1]; // Obtener el token después de "Bearer"
    }
  
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

  jwt.verify(token, TOKEN_SECRET, (err, userDecoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" })
    req.user = userDecoded
    next()
  })
}

export default authRequire
