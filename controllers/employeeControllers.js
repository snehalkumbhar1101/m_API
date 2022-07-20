const db = require('../models')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();
const AccessControl = require('accesscontrol');

const ac = require('./accessControl')


//create main model

const Employee = db.employees
const Role = db.roles


//1. Create User

const addUser = async (req, res) => {
  
  const { name, email, password, designation, role } = req.body

  if (!name || !email || !password || !designation || !role) {
    return res.status(422).json({ status: false, message: 'All input is required' })

  }
  

  const permission = ac.can(role).readAny('Employee');
  console.log(permission.granted)
  if(!permission.granted){
    return res.status(422).json({ status: false, message: 'Permission Denied!' })
  }
  

  encryptedPassword = await bcrypt.hash(password, 10);

  Role.findAll({

    where: { name: role }

  }).then(data => {

    console.log(role)

    const r_id = data[0].r_id
    

    Employee.create({ name, email, password: encryptedPassword, designation, r_id }).then(data => {




      const token = jwt.sign(
   
        { e_id: Employee.e_id },
        process.env.TOKEN_KEY,
        
        {
          expiresIn: "2h",
        })
       
      
      // save user token
    
      Employee.token = token;

      res.status(200).json({data, token})

      
    })
    
  })

}



//2.get all user

const getAllUsers = async (req, res) => {

  let employees = await Employee.findAll({})
  res.status(200).send(employees)
}

//3.get Single users

const getOneUser = async (req, res) => {
  let id = req.params.id
  let employee = await Employee.findOne({ where: { e_id: id } })
  res.status(200).send(employee)

}

//4.update user

const updateUser = async (req, res) => {

  let id = req.params.id

  const employee = await Employee.update(req.body, { where: { e_id: id } })
  res.status(200).send(employee)
}

//5.Delete User

const deleteUser = async (req, res) => {

  let id = req.params.id

  await Employee.destroy({ where: { e_id: id } })
  res.status(200).send('User is deleted!')
}


//1. Create Role
const addRole = async (req, res) => {
  let info = {
    id: req.body.id,
    name: req.body.name,
  }

  const role = await Role.create(info)
  res.status(200).send(role)
  console.log(role)
}

// const ac = new AccessControl(grants);

// router.get('/posts/:title', function (req, res, next) {
//     const permission = ac.can(req.user.role).readAny('post');
//     if (permission.granted) {
//         Video.find(req.params.title, function (err, data) {
//             if (err || !data) return res.status(404).end();
//             res.json(permission.filter(data));
//         });
//     } else {
//         res.status(403).end();
//     }
// });


module.exports =
{
  addUser,
  AccessControl,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addRole,
 
}