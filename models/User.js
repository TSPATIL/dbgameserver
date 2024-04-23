const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String
    },
    photoUrl: {
        type: String,
        required: true,
        default: "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"
    },
    emailverified: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    providerType: {
        type: String
    },
    firebaseUserId: {
        type: String
    },
    creationTime:{
        type: String,
        required: true
    },
    lastSignInTime: {
        type: String
    },
});

const User = mongoose.model('users', userSchema);
module.exports = User;