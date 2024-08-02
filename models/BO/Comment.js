const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    Content: { type: Schema.Types.String, require: [true, "Content is required"], maxLength: 1000 },
    Author: { type: Schema.Types.ObjectId, ref: 'Account', require: [true, "Author is required"] },
    Unit : { type: Schema.Types.String, require: [true, "Unit is required"], maxLength: 1000 },
    Amount : { type: Schema.Types.Number, require: [true, "Amount is required"], min: 1 , max: 100 },
    ParentComment: { type: Schema.Types.ObjectId, ref: 'Comment'},
    IsDeleted: { type: Schema.Types.Boolean, default: false },
}, {
    timestamps: {
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
})

const CommentModel = model("Comment", commentSchema)

module.exports = CommentModel