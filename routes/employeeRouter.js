
  const employeeController = require('../controllers/employeeControllers.js')

  const router = require ('express').Router()

  router.post('/addUser', employeeController.addUser)
  
  router.get('/allUsers', employeeController.getAllUsers)

  router.get('/:id', employeeController.getOneUser)

  router.put('/:id', employeeController.updateUser)

  router.delete('/:id', employeeController.deleteUser)

  router.post('/addRole', employeeController.addRole)

  module.exports = router





