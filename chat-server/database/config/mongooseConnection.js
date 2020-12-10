function configureMongoose(){
    const mongoose = require('mongoose');
    return mongoose.connect('mongodb://127.0.0.1:27017/TonkaBiApp', {useNewUrlParser: true, useUnifiedTopology: true});
}

const db = configureMongoose().then(console.log("Connected to mongodb"));
module.exports =  db;