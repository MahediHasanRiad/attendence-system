const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const router = require('../router/index')


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// router
app.use(router)
app.use((err, req, res, next)=> {
    console.log(err)
    const message = err.message ? err.message : 'something wrong'
    const status = err.status ? err.status : 500
    res.status(status).json({massage: message})
})


// database connect
mongoose.connect('mongodb://localhost:27017/attendance-app')
.then(() => {
    console.log('database connected')
    app.listen(4141, () => {
        console.log('server on...')
    })
})