const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const callSchema = new Schema({
    callID: {
        type: String,
        required: true
    },
    callTitle: {
        type: String,
        required: true
    },
    callTag: {
        type: String,
        required: true
    },
    timeStarted: {
        type: Date,
        default: Date.now,
        required: true
    },
    onGoing: {
        type: Boolean,
        required: true
    },
},
{timestamps: true})

const Call = mongoose.model('Call', callSchema);

module.exports = Call;