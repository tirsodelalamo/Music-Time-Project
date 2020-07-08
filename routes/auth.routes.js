const express = require("express")
const router = express.Router()
const passport = require("passport")

const User = require("../models/user.model")

const bcrypt = require("bcrypt")
const bcryptSalt = 10

//JSON DATA
router.get('/api', (req, res) => {
	User.find()
		.then(users => res.json({ users }))
		.catch(err => (console.log(err)))
})


// User signup
router.get("/signup", (req, res) => res.render("auth/signup"))
router.post("/signup", (req, res, next) => {

    const { username, password } = req.body

    if (!username || !password) {
        res.render("auth/signup", { errorMsg: "Rellena el usuario y la contraseña" })
        return
    }

    User.findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe en la BBDD" })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ username, password: hashPass })
                .then(() => res.redirect("/"))
                .catch(() => res.render("auth/signup", { errorMsg: "No se pudo crear el usuario" }))
        })
        .catch(error => next(error))
})


// User login
router.get('/login', (req, res) => res.render('auth/login', { "errorMsg": req.flash("error") }))
router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
    badRequestMessage: 'Rellena todos los campos'
}))


// User logout
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
})

//PROFILE ACCESS

const checkAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/signup')

router.get('/profile', checkAuthenticated, (req, res) =>{
    res.render('user/profile', { user: req.user })
        
}) 

router.get('/profile/edit/:id', checkAuthenticated, (req, res) => {
    res.render('user/edit', {user: req.user})
})

router.post('/profile/edit/:id', checkAuthenticated, (req, res) => {

    
    const {username, password} = req.body
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)
    
//Campos repes
    if (!username || !password) {
        res.render("user/edit", { errorMsg: "Datos introducidos incorrectos" , user: req.user})
        return
    }

    User
        .findByIdAndUpdate(req.params.id, {
            username,
            password: hashPass
        }, { new: true })
        .then(user => {
            console.log(user.username)
             if (user.username) {
                res.render("auth/signup", { errorMsg: "El usuario ya existe en la BBDD" })
                return
             }
        })
        .then(() => res.redirect("/"))
        .catch(() => res.render("auth/signup", { errorMsg: "No se pudo actualizar el usuario" }))

})

router.get('/profile/display', checkAuthenticated, (req, res) => {
    res.render('user/display', {user: req.user})
})

router.get('/profile/display/playlist', checkAuthenticated, (req, res) => {
    res.render('playlist/index', {user: req.user})
})


module.exports = router