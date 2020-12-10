const mongoose = require('mongoose');
const { Schema } = mongoose;
const  db = require('../config/mongooseConnection');

const roomMessages = new Schema({
    userId: String,
    userName: String,
    roomId: String,
    message: String
});

const RoomMessagesModel = mongoose.model('roomMessages',roomMessages);
module.exports =  RoomMessagesModel;