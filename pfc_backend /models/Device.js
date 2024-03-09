const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeviceModel = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    deviceType: {
        type: Number,
        default: null
    },
    deviceToken: {
        type: String
    }
}, {
    timestamps: true
});
const Device = mongoose.model('Device', DeviceModel);
module.exports = Device;
