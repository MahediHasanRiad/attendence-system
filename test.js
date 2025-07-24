const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String
})

const User2 = mongoose.model('User', userSchema)

async function createUser(data){
    const user = new User2({...data})
    await user.save()
    return user
}

mongoose.connect('mongodb://localhost:27017/test2')
.then(() => {
    console.log('database connected')
    createUser({name: 'tamim', email: 'tamim@gmail.com'})
}).catch(e => {
    console.log(e)
})