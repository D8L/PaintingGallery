const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    title: {
        type: String, required: true,
    }, artist: {
        type: String, required: true,
    }, URL: {
        type: String, required: false,
    }, year: {
        type: Number, required: false,
    }, color: {
        type: String, required: false,
    }
});

const UserModel = mongoose.model("paintings", UserSchema);
module.exports = UserModel;