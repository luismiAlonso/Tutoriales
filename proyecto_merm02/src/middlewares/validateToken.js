import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';

export const authRequire = (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({message: 'No token, authorization denied'})
    
    jwt.verify(token,TOKEN_SECRET,(err, userDecoded) => {
        if(err) return res.status(403).json({message: 'Invalid token'})
        req.user = userDecoded
        next()
    })

    
}