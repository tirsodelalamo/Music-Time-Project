// console.log("AQUÍ ESTAMOS, desde el axios para spoti")
// //////////////////////AUTENTICACIÓN SPOTI////////////////
// const SpotifyWebApi = require("spotify-web-api-node");
// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     redirectUri: 'http:localhost:3000/playlist/new'
//     /* CLIENT_ID=db5476df850242edbfc2443e875f75b2
//     CLIENT_SECRET=e92667f3f707483d963d299ca82dee54 */
// });
// spotifyApi.clientCredentialsGrant().then((data) => {
//     console.log(process.env.CLIENT_ID)
//     spotifyApi.setAccessToken(data.body["access_token"])
//     console.log("todo correct con el spotify token")
// }).catch((error) => console.log("Something went wrong when retrieving an access token", error));
// //////////////////////////////////////////////////////////


// const axiosApp = axios.create({
//     baseURL: 'https://localhost:3000/playlist'
// })


// /// Título playlist
// document.querySelector('#playlistForm').onsubmit = e => {
//     console.log('entras?')
//     e.preventDefault()
//     const artistInput = document.querySelector('#playlistForm input').value
//     console.log(artistInput)
//     //getArtist(artistInput)
// }

// function createPlaylist(title, duration) {
//     axiosApp.get('/characters')
//         .then(response => {

//         })
//         .catch(err => console.log('err', err))
// }

// function getArtist(artist) {
//     console.log('entras en', artist)
//     axios({
//         url: 'https://api.spotify.com/v1/search',
//         method: 'GET',
//         dataType: 'json',
//         data: {
//             type: 'artist',
//             q: artist
//         }
//     })
//         .then(response => console.log(response))
//         .catch(err => console.log('Error en getArtist', err))
// }

