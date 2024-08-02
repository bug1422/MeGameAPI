const { Schema, model } = require("mongoose");

const accountVoteSchema = new Schema({
    Account: { type: Schema.Types.ObjectId, ref: 'Account', require: [true, "Account is required"] },
    Comment: { type: Schema.Types.ObjectId, ref: 'Comment', require: [true, "Comment is required"]},
    Value: { type: Schema.Types.Number, require, enum: [-1,1]}
},{
    _id: false
})

const AccountVoteSchema = model("AccountVote", accountVoteSchema)

module.exports = AccountVoteSchema