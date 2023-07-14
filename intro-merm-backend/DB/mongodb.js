const mongoose =require('mongoose');

async function connectDB ({host,port,dbName}){
    const uri = `mongodb://${host}:${port}/${dbName}`
    mongoose.connect(uri, {useNewUrlParser:true})
}

module.exports =connectDB;