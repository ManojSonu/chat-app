const mongoose = require('mongoose');
const { Schema } = mongoose;
const  db = require('../config/mongooseConnection');

const userSchema = new Schema({
    name: String
});

const UserSchemaModel = mongoose.model('users',userSchema);
module.exports = UserSchemaModel;