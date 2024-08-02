const { Schema, model } = require('mongoose')
const PostModel = require('./Post')

const newsSchema = new Schema({
    Content: { type: Schema.Types.String, require: [true, "Content is required"], maxLength: 1000 },
})

const NewsModel = PostModel.discriminator('News',newsSchema)


module.exports = NewsModel