import mogoose from 'mongoose'
import { DBNAME, HOST, PORT } from './config.js'

export const connectDB = async () => {
    try{
       await mogoose.connect(`mongodb://${HOST}:${PORT}/${DBNAME}`)
       console.log(`mongodb://${HOST}:${PORT}/${DBNAME}`)

    }catch(error){
        console.log(error.message)
    }
}
