const mongoose = require("mongoose")
const Schema = mongoose.Schema

const playlistSchema = new Schema({
   title: {
            type: String,
            unique:true
        },
        tracks: {
        type :[String],
   }, 
        duration: {
    	type: Number,
    },

}, {
    timestamps: true
})


const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist