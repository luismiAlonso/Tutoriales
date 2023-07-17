require('dotenv').config();
const app = require('./app');
const connectDB = require('./DB/mongodb');
const { appConfig, dbConfig } = require('./config');

async function initApp(appConfig,dbConfig){

    try{
        await connectDB(dbConfig);
        app.listen(appConfig.port, () => console.log(`Listening on ${appConfig.port}`));
        
    }catch(e){
        console.error(e);
        process.exit(0);
    }
 
}

initApp(appConfig,dbConfig);


