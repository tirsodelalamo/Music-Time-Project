const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique:true
    },
    password: String,
    // location: {
    //     type: { type: String },
    //     coordinates: [Number]
    //   }
}, {
    timestamps: true
})

// userSchema.index({ location: '2dsphere' })

const User = mongoose.model("User", userSchema)

module.exports = User