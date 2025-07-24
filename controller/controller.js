const User = require('../model/User')
const bcrypt = require('bcrypt')

// Registration
exports.registration = async (req, res) => {
    const { name, email, password } = req.body

    // find empty field
    if(!name || !email || !password){
        return res.status(400).json({massage: 'Invalid Request'})        
    }
    // check email
    const checkEmail = await User.findOne({ email: email })
    if(checkEmail){
        return res.status(400).json({massage: 'User exist'})
    }

    // create user
    const user = User({name: name, email: email, password: password})
    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)
    user.password = hashPass

    await user.save()

    return res.status(201).json({massage: 'User Created', user})
}


// Login
exports.login = async (req, res) => {

    const { email, password } = req.body
    
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({massage: 'Invalid Credential'})
    }

    // compare hash-password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({massage: 'Invalid credential'})
    }

    delete user._doc.password   // don't want to show password user screen
    
    return res.status(200).json({massage: 'Login Success', user})
}