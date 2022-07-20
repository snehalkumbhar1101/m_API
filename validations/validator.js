const Validator = require('validator');
const isEmpty = require('./is_empty');
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.designation = !isEmpty(data.designation) ? data.designation : '';
  data.role = !isEmpty(data.role) ? data.role : '';
  //check fields
  if (Validator.isEmpty(data.name) && Validator.isEmpty(data.email) && Validator.isEmpty(data.designation)) {
    errors.msg = 'All fields are required';
  }
  else if (Validator.isEmpty(data.name) && Validator.isEmpty(data.email)) {
    errors.msg = 'Both fields required';
  }
  else if (Validator.isEmpty(data.name)) {
    errors.email = 'Name field is required';
  }
  else if (Validator.isEmpty(data.email)) {
    errors.mobile = 'Email field is required';
  }
  else if (Validator.isEmpty(data.designation)) {
    errors.username = 'Designation field is required';
  }
  //check valid field
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  else if (!Validator.isAlphanumeric(data.name)) {
    errors.mobile = 'name is invalid';
  }
  else if (!Validator.isAlphanumeric(data.designation)) {
    errors.username = 'Designation is invalid';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};