module.exports = app => {

  // Base URLS
  app.use('/', require('./index.routes'))
  app.use('/', require('./auth.routes'))
  // app.use('/user', require('./base.routes'))
  app.use('/playlist', require('./playlist.routes'))
  // app.use('/playlistCRUD', require('./playlistCRUD.routes')) 
}
