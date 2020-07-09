// const express = require('express')
// const router = express.Router()

// const Playlist = require('../models/playlist.model')

// //IMPLEMENTADO MOSTRAR TODAS LAS PLAYLIST EN VISTA (DE MOMENTO NO)

// // router.get('/', (req, res) => {

// //     Playlist
// //         .find()
// //         .then(allPlaylists => res.render ('whatever/whatever', {allPlaylists}))
// //         .catch(err => console.log(err))

// // })

// //CREACION DE PLAYLIST

// router.get('/formPlaylist', (req, res) => res.render('VISTA_FORMULARIO'))

// router.post('/formPlaylist', (req, res) => {

//     const {title, tracks, user, duration, artist}

//     Playlist
//         .create({title, tracks, user, duration, artist})
//         .then(() => res.redirect('WHATEVER')) //MIRAR BIEN
//         .catch(err => console.log(err))

// })

// //BORRADO DE PLAYLIST (MEDIANTE BOTON QUE MANDE A RUTA DELETE) (EN VISTA DETALLE)

// router.post('/delete', (req, res) => {

//     Playlist
//         .findByIdAndRemove(req.params.id)
//         .then(() => res.redirect('/profile'))
//         .catch(err => console.log(err))

// })

// //VISUALIZACION DE DETALLES DE LISTA

// router.get('/formPlaylist/:id', (req, res) => {

//     Playlist
//       .findById(req.params.id)
//       .populate('PLAYLIST_ID') //MIRAR BIEN 
//       .then(thePlaylist => res.render('/playlist/details', { thePlaylist }))
//       .catch(err => console.log(err))
      
//   })



// module.exports = router