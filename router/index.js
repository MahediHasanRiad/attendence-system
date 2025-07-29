const router = require('express').Router()
const authRouter = require('../router/authRouter') 
const userRouter = require('../router/userRouter')

router.use('/api/v1/auth', authRouter)
router.use('/api/v1/user', userRouter)

module.exports = router