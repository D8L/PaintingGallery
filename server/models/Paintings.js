const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    artist: {
        type: String, required: true,
    }, title: {
        type: String, required: true,
    }, year: {
        type: Number, required: false,
    }, color: {
        type: String, required: false,
    }, URL: {
        type: String, required: false,
}});

const UserModel = mongoose.model("paintings", UserSchema);
module.exports = UserModel;