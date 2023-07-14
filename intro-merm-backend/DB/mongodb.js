const mongoose =require('mongoose');

async function connectDB ({host,port,dbName}){
    const uri = `mongodb://${host}:${port}/${dbName}`
    mongoose.connect(uri, {userNewUrlParser:true})
}

module.exports =connectDB;