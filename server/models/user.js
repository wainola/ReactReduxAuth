const mongoose = require('mongoose');
// USING SCHEMA FROM MONGOOSE
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define our model
const userSchema = new Schema({
    // email should be unique
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// on save kooh, encrypt password
// BEFORE SAVING THE MODEL, RUN THIS FUNCTION
userSchema.pre('save', function(next){
    // GET ACCESS TO THE USER MODEL
    const user = this;

    // GENERATE A SALT THEN RUN CALLBACK
    bcrypt.genSalt(10, function(err, salt){
        if(err){ return next(err); }

        // HASH OUR PASSWORD USING THE SALT
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) { return next(err); }

            // OVERWRITE PLAIN TEST PASSWORD WITH ENCRYPTED PASSWORD
            user.password = hash;
            next();
        });
    });
});

// create the model class
// loading the schema to mongo
const ModelClass = mongoose.model('user', userSchema);

// export the model
module.exports = ModelClass;