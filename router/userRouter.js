const router = require('express').Router()
const users = require('../controller/userController')

// get all user
router.get('/', users.getAllUser)
// find user by id
router.get('/:id', users.findUserById)
// find user by email
router.get('/:email', users.getUserByEmail)

// create user
router.post('/', users.createUser)
// update user by id
router.put('/:id', users.userUpdateById)
// update user by id
router.patch('/:id', )
// delete user by id
router.delete('/:id', users.userDeleteById)

module.exports = router