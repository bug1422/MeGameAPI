const { Schema, model } = require("mongoose")


const tagSchema = new Schema({
    Tag: { type: Schema.Types.String, require: [true, "Required tag"], maxLength: 50}
})

const TagModel = model('User', tagSchema)

module.exports = TagModel