const mongoose = require('mongoose');
const { Schema } = mongoose;
const  db = require('../config/mongooseConnection');

const roomMembers = new Schema({
    userId: String,
    roomId: String
});

const RoomMembersModel = mongoose.model('roomMembers',roomMembers);
module.exports =  RoomMembersModel;