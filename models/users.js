const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.statics.findByEmail = async function(email) {
    return this.findOne({ email });
};

const User = mongoose.model('Users', userSchema);
User.createIndexes();
module.exports = User;