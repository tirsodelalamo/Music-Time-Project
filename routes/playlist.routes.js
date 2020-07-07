require('dotenv').config()
const express = require("express")
const router = express.Router()
// const User = require("../models/user.model")
//const Playlist = require("../models/playlist.model")

//////////////////////AUTENTICACIÓN SPOTI////////////////
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http:localhost:3000/playlist/new'
    /* CLIENT_ID=db5476df850242edbfc2443e875f75b2
    CLIENT_SECRET=e92667f3f707483d963d299ca82dee54 */
});
spotifyApi.clientCredentialsGrant().then((data) => {
    spotifyApi.setAccessToken(data.body["access_token"])
    console.log("todo correct con el spotify token")
}).catch((error) => console.log("Something went wrong when retrieving an access token", error));
//////////////////////////////////////////////////////////


function getArtist(value) {
    let artist = ""
    spotifyApi.searchArtists(value)
        .then((data) => {
            artist = data.body.artists.items[0].id
            console.log('Id del artista', artist)
            getAlbums(artist)
        })
        .catch((err) => console.log("The error while searching artists occurred: ", err));
}

function getAlbums(artist) {
    let albumsArr = []
    spotifyApi.getArtistAlbums(artist)
        .then((data) => {
            let albumsId = data.body.items
            albumsArr = albumsId.map(e => e.id)
            console.log('ID de albums', albumsArr)

            getTracks(albumsArr)
        })
        .catch((err) => console.log("The error while searching albums occurred: ", err))
}

let listaCanciones = []
let tracksArr = []
let tracksId = {}
let stringy = []
function getTracks(albums) {
    // let albumsStr = albums.join(',')
    // console.log(albumsStr)
    stringy = []
    albums.forEach(elm => {
        //console.log(elm)
        getAlbumTracks(elm)
    })
}
function getAlbumTracks(data) {
    spotifyApi.getAlbumTracks(data)
        .then((data) => {
            //MAPEAR cada para sacar cada id de tracks y almacenar en array 
            tracksId = data.body.items
            tracksArr = tracksId.map(e => e.name)
            console.log('ID de tracks', tracksArr.length)
            return tracksArr
        })
        .then((data) => {
            data.forEach(e => stringy.push(e))
            console.log(stringy.length - 1)
            return stringy
        })
        .catch((err) => console.log("The error while searching albums occurred: ", err))
}


function getRandom(num, tracks) {
    console.log(tracksArr)
    //spotifyApi.getAudioFeaturesForTrack('3Qm86XLflmIXVm1wcwkgDK') - spotifyApi.getAudioFeaturesForTracks(['4iV5W9uYEdYUVa79Axb7Rh', '3Qm86XLflmIXVm1wcwkgDK'])
    let randomResults = [];
    for (let i = 0; i < num; i++) {
        randomResults.push(tracks[Math.floor(Math.random() * tracks.length)])
    }
    //console.log(randomResults)
    return randomResults;
}

/////////////////////RUTAS//////////////////
router.get("/new", (req, res) => res.render('playlist/index'))

router.post("/new", async (req, res, next) => {
    try {
        const data = req.body.artist
        await getArtist(data)
        // res.json(artistId)
        // console.log(artistId)
    } catch (err) {
        console.log(err)
        return next(err)

    }
})


module.exports = router