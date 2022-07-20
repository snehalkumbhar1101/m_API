
const AccessControl = require('accesscontrol'); 
const ac = new AccessControl();

ac.grant('user')                                             // define new or modify existing role. also takes an array.                                     
    .deleteOwn('Employee')
  .grant('projectmanager')                   
    .extend('user')
    .createOwn('Employee')                  
    .updateOwn('Employee', ['name','email','password','designation'])
  .grant('admin')                                             // switch to another role without breaking the chain
   .extend('projectmanager')                                  // inherit role capabilities. also takes an array
   .updateAny('Employee', ['name','email','password','designation','role'])  // explicitly defined attributes
   .deleteAny('Employee')
   .createAny('Employee') 




   permission = ac.can('user').createOwn('Employee');
   console.log(permission.granted);    // —> true
   console.log(permission.attributes); // —> ['*'] (all attributes)
    
   permission = ac.can('projectmanager').updateOwn('Employee');
   console.log(permission.granted);    // —> true
   console.log(permission.attributes); // —> ['title']

   permission = ac.can('admin').updateAny('Employee');
   console.log(permission.granted);    // —> true
   console.log(permission.attributes); // —> ['title']

   module.exports = ac

