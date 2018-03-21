const mongoose = require('mongoose');
// USING SCHEMA FROM MONGOOSE
const Schema = mongoose.Schema;

// define our model
const userSchema = new Schema({
    // email should be unique
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// create the model class
// loading the schema to mongo
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;