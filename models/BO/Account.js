const { Schema, model } = require("mongoose")


const userSchema = new Schema({
    UserName: { type: Schema.Types.String, require: [true, "UserName is required"]},
    FullName: Schema.Types.String,
    Email: { type: Schema.Types.String, require: [true, "Email is required"]},
    HashedPassword: { type: Schema.Types.String, require: [true, "Password is required"]},
    Gender: { type: Schema.Types.String, enum: ["Male" , "Female" , "Other"] , require: [true, "Gender is required"]},
    Avatar: Schema.Types.String,
    LastLogin: { type: Schema.Types.Date, default: Date.now()},
    Role: { type: Schema.Types.String, enum: ["ADMIN", "MOD", "CREATOR", "MEMBER"], require: [true, "Role is required"], default: "MEMBER"},
    IsActive: { type: Schema.Types.Boolean, default: true},
    IsDeleted: { type: Schema.Types.Boolean, default: false},
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
    }
})

const UserModel = model('User', userSchema)

module.exports = UserModel