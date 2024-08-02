const { Schema, model } = require("mongoose");
const PostModel = require("./Post");

const gameSchema = new Schema({
    Description: { type: Schema.Types.String, require: [true, "Description is required"] },
    Logo: { type: Schema.Types.String, require: [true, "Logo is required"] },
    Thumbnail: [Schema.Types.String],
})

const GameModel = PostModel.discriminator("Game", gameSchema)

module.exports = GameModel