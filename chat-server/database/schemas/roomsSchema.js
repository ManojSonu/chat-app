const mongoose = require('mongoose');
const { Schema } = mongoose;
const  db = require('../config/mongooseConnection');

const roomSchema = new Schema({
    name: String
});

const RoomSchemaModel = mongoose.model('rooms',roomSchema);
module.exports =  RoomSchemaModel;