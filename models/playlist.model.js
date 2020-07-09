const mongoose = require("mongoose")
const Schema = mongoose.Schema

const playlistSchema = new Schema({
   title: {
            type: String,
            default: 'Playlist',
            maxlength: 25
        },

    tracks: {
            type :[String],
        },
    
    user: { type: Schema.Types.ObjectId, ref: 'User' },    

    duration: {
    	    type: Number,
        },

    artist: {
            type: String,
    },

}, {
    timestamps: true
})


const Playlist = mongoose.model("Playlist", playlistSchema)

module.exports = Playlist