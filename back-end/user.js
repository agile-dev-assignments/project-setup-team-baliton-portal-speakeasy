const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {
        type: Number,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    inCall: {
        type: Boolean,
        required: false
    },
    isModerator: {
        type: Boolean,
        required: false
    },
    callID: {
        type: Number,
        required: false
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;