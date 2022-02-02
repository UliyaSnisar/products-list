//роутеры пробросили на контроллеры
const express = require('express')
const router = express.Router()
const {validateSignupUser, validateLoginUser} = require('./validation')
const {
    registration,
    login,
    logout
} = require('../../../controllers/users_controller')
const guarg = require('../../../helpers/guard')
const loginLimit = require('../../../helpers/rale_limit_login')

router.post('/registration', validateSignupUser, registration)

router.post('/login', loginLimit, validateLoginUser, login)

router.post('/logout', guarg, logout)

module.exports = router;