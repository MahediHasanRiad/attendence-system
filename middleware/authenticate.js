const jwt = require('jsonwebtoken')
const User = require('../model/User')

async function authenticate(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(400).json({massage: 'unauthorize'})
    }

    const decoded = jwt.verify(token, 'secret')
    const user = User.findById(decoded._id) 

    if(!user){
        return res.status(400).json({massage: 'unauthorize'})
    }

    req.user = user // send user in controller {req is mutable}

    next()
}

module.exports = authenticate;