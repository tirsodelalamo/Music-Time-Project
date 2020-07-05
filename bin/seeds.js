const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require("../models/user.model")

//async para mapear users creados y cambiarles password

router.get('/', (req, res) => res.render('index'))


const DB = 'music-time';

mongoose.connect(`mongodb://localhost/${DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

//-------------------------------------------

const users = [
    {
        username: "Terminator",
        password: "sci-fi",
    },


]

//

/*router.post("/signup", (req, res, next) => {

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
}) */
//-------------------------------------------

// User.create(users, (err) => {

//     if (err) { throw(err) }
  
//     console.log(`Created ${users.length} users`)
  
//     mongoose.connection.close();
  
// });

const salt = bcrypt.genSaltSync(bcryptSalt)
const hashPass = bcrypt.hashSync(password, salt)


User.create(users, (err) => {
                console.log(users)
                users.password = { password: hashPass }
                 if (err) { throw(err) }

                 console.log(`Created ${users.length} users`)

                 mongoose.connection.close();

             });



  