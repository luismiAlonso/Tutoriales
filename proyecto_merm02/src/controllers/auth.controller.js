import User from '../models/user.model.js'
import bcryp from 'bcryptjs'
import { createAccesToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { email,password,username,level } = req.body

    try{
        //validamos si existe usuario
        const userFound = await User.findOne({email})
        if(userFound) return res.status(400).json(["The email is already exists"])
        //entra pass y se encripta
        const passwordHash = await bcryp.hash(password, 10)
        //se crea usuario
        const newUser = new User(
            {
                email,
                password:passwordHash,
                username,
                level
            }
        )
       //se guarda 
       const userSaved = await newUser.save()
       //creamos token
       const token = await createAccesToken({id: userSaved._id}) 
       //guardamos en cookie
       res.cookie('token',token)
       //respuesta y envio de datos mapeados
       res.json({
            message: "User created successfully",
            id:userSaved.id,
            username:userSaved.username,
            email: userSaved.email,
            level: userSaved.level,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })

    }catch(error){
        res.status(500).json({ message:error.message})
    }

}

export const login = async (req, res) => {

    const { email,password,level } = req.body

    try{

        const userFound = await User.findOne({email})
        //no encuentra usuario
        if(!userFound) return res.status(400).json({message: "User not found"})
        //comparo contraseñas o mail en este caso
        const isMatch = await bcryp.compare(password,userFound.password)
        //sino lo encontro
        if(!isMatch) return res.status(400).json({message:"Incorrect password"})
       //de usuario encontrado si creamos token
       const token = await createAccesToken({id: userFound._id}) 
       //guardamos en cookie
       res.cookie('token',token)
       //respuesta y envio de datos mapeados
       res.json({
            message: "User found",
            id:userFound.id,
            username:userFound.username,
            email: userFound.email,
            level: userFound.level,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })

    }catch(error){
        res.status(500).json({ message:error.message})
    }
}

export const logout = (req, res) => {
    res.cookie('token','',
    {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
   const userFound = await User.findById(req.user.id)
   if(!userFound) return res.status(400).json({ message: "User not found"})

   return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
   })
    res.send('profile')
}