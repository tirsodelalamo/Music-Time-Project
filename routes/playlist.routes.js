require('dotenv').config()
const express = require("express")
const router = express.Router()
const User = require("../models/user.model")
const Playlist = require("../models/playlist.model")

//////////////////////AUTENTICACIÓN SPOTI////////////////
const SpotifyWebApi = require("spotify-web-api-node"); //meter aquí configs
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
    return new Promise(resolve => {
        let artist = ""
        spotifyApi.searchArtists(value)
            .then((data) => {
                artist = data.body.artists.items[0].id
                //console.log('Id del artista', artist)
                resolve(getAlbums(artist));
                return getAlbums(artist)
            })
            .catch((err) => console.log("The error while searching artists occurred: ", err));
    });
}

function getAlbums(artist) {
    let albumsArr = []
    spotifyApi.getArtistAlbums(artist)
        .then((data) => {
            let albumsId = data.body.items
            albumsArr = albumsId.map(e => e.id)
            //console.log('ID de albums', albumsArr)
            return getTracks(albumsArr)
        })
        .catch((err) => console.log("The error while searching albums occurred: ", err))
}
// function getAlbums(artist) {
//     let albumsArr = []
//     return ("HOLA", data) //hasta aquí llega, en el then da undefined
//     spotifyApi.getArtistAlbums(artist)
//         .then((data) => {
//             let albumsId = data.body.items
//             albumsArr = albumsId.map(e => e.id)
//             //console.log('ID de albums', albumsArr)
//             return getTracks(albumsArr)
//         })
//         .catch((err) => console.log("The error while searching albums occurred: ", err))
//     return ("HOLA", data)
// }

function getRandomTracks() {
    return new Promise(resolve => {
        let randomizer = getRandomSearch()
        let randomList = []
        spotifyApi.searchTracks(randomizer, { limit: 50 }) ///LÍMITE DE 50, sino se especifica es de 20
            .then((data) => {
                let datos = data.body.tracks.items
                return datos
            })
            .then((data) => {
                data.forEach(e => randomList.push(e))
                //console.log('Lista Random', randomList)
                resolve(getDetails(randomList));
                return getDetails(randomList)
            })
            .catch((err) => console.log("The error while searching random tracks occurred: ", err))
    })
}
/////////////////////@perrydrums git
function getRandomSearch() {
    // A list of all characters that can be chosen.
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
    let randomSearch = '';
    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
        case 0:
            randomSearch = '%' + randomCharacter;
            break;
        case 1:
            randomSearch = '%' + randomCharacter + '%';
            break;
    }
    return randomSearch;
}

let arrEmpty = []
function getTracks(albums) {
    albums.forEach(element => {
        spotifyApi.getAlbumTracks(element)
            .then((data) => {
                let tracksId = data.body.items
                tracksId.forEach(elm => { arrEmpty.push(elm) })
            })

            .catch((err) => console.log("The error while searching tracks occurred: ", err))
    })
    getDetails(arrEmpty)
    arrEmpty = [""]
}

function getDetails(songs) {
    let arrSong = []
    songs.forEach(e => {
        const datos =
            { name: e.name, id: e.id, duration: Math.floor(e.duration_ms / 1000), artist: e.artists, preview: e.preview_url }
        arrSong.push(datos)
    })
    //pasarle tiempo 
    return createRandomPlaylist(60, arrSong)
}

const locuritaPlaylist = []
function createRandomPlaylist(durationMap, songs) {
    //todo en segundos
    const MAX = durationMap * 60
    let cont = 0
    let playlist = []
    songs.shift() //porque la primera salía undefined??
    const randomizedArr = shuffle(songs)
    songs.forEach(e => {
        if ((cont <= MAX)) {
            playlist.push(e)
            cont = cont + (e.duration)
        }
        // console.log(e.duration) //1m - 60.000,ms, matemáticas allá voy! | 1s - 1000ms
    })
    playlist.forEach(e => {
        //console.log('---------')
        //console.log(e.name)
    })
    //console.log('RESULTADO FUNCIoN', playlist)
    return playlist
}
//////Shuffle para array (stackoverflow)
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

router.get("/new", (req, res) => res.render('playlist/index'))

router.post("/new", (req, res, next) => {
    console.log(req.body)

    const { playlist, list, artist, duration } = req.body
    console.log('playlist', playlist)
    console.log('artist', artist)
    console.log('duration', duration)
    console.log('boton', list)

    const allUsers = User.find()

    //METER IF PARA ASYNCALLs DISTINTAS, o meterlas en el mismo cuando furule la de artistas
    async function asyncCall() {
        console.log('calling');
        const resultRandom = await getRandomTracks();
        return resultRandom
    }
    async function asyncCallArt(artist) {
        console.log(artist)
        const resultArtist = await getArtist(artist);
        console.log('ASYNC RESULT ARTIST', resultArtist);
        return resultArtist
    }

    asyncCall().then(data => {
        res.send(data)
        console.log(data)
    })

    // asyncCallArt(artist).then(data => {
    //     res.send(data)
    //     console.log(data)
    // })

})

module.exports = router