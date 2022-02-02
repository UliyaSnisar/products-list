//роутеры пробросили на контроллеры
const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout
} = require('../../controllers/users_controller')
const guarg = require('../../helpers/guard')

router.post('/registration', registration)

router.post('/login', login)

router.post('/logout', guarg, logout)

module.exports = router;