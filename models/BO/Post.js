const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    Title: { type: Schema.Types.String, require: [true, "Title is required"] },
    Content: { type: Schema.Types.String, require: [true, "Content is required"], maxLength: 1000 },
    Clicked: { type: Schema.Types.Number, default: 0},
    Love: { type: Schema.Types.Number, default: 0 },
    IsDeleted: { type: Schema.Types.Boolean, default: false },
    Tags: [Schema.Types.String],
},{
    timestamps:{
        createdAt: 'CreatedAt',
        updatedAt: 'UpdatedAt'
    },
    toJSON: {
        getters: true,
        virtuals: true
    },
    toObject: {
        getters: true,
        virtuals: true
    },
    discriminatorKey: "type"
})

const PostModel = model('Post', postSchema)

module.exports = PostModel