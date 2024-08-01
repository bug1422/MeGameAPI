const { Schema, model } = require("mongoose");

const GamePost = new Schema({
    UserName: Schema.Types.String,
    FullName: Schema.Types.String,
    Gender: Schema.Types.String,
    Avatar: Schema.Types.String,
    LastLogin: Schema.Types.Date,
    Role: Schema.Types.String,
    CreatedAt: Schema.Types.Date,
    IsActive: Schema.Types.Boolean,
    IsDeleted: Schema.Types.Boolean,
})
const GamePostModel = model("GamePost",GamePost)

module.exports = GamePostModel