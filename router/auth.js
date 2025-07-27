const router = require('express').Router()
const { registration, login } = require('../controller/controller')
const authenticate = require('../middleware/authenticate')


router.post('/registration', registration)
router.post('/login', login)
router.get('/privet', authenticate, (req, res) => {
    res.send('success')
})


module.exports = router