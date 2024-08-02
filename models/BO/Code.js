const { Schema, model } = require("mongoose");
const PostModel = require("./Post");

const codeSchema = new Schema({
    Game: { type: Schema.Types.ObjectId, ref: 'Game', require: [true, "Game is required"] },
    Path: { type: Schema.Types.String, require: [true, "Path is required"]}
})

const CodeModel = model("Code", codeSchema)

module.exports = CodeModel