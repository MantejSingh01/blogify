const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var BlogModel = new Schema({
    userId: { 
        type: ObjectId, ref: "user"
    }, 
    title: {
        type: String,
        default: null
    },
    summary: {
        type: String,
        default: null
    },
    author: {
        type: String,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('blog', BlogModel);