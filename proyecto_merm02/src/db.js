import mogoose from 'mongoose'

export const connectDB = async () => {
    try{
       await mogoose.connect('mongodb://localhost/merndb')
       console.log('DB is connected')
    }catch(error){
        console.log(error.message)
    }
}
