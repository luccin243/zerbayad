const Joi = require('joi') // Module used for validators
const validateRequest = require('./validatorsRequest')

exports.signupValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().label('Name').min(3).max(32).required(),
    email: Joi.string().label('Email').min(3).max(32).required().email(),
    password: Joi.string().label('Password').min(6).max(32).required(),
    confirmPassword: Joi.string()
      .label('Confirm Password')
      .valid(Joi.ref('password'))
      .required(),
    about: Joi.string().label('About').min(10).max(150),
    role: Joi.string().label('Role').valid('Admin', 'User').required(),
  })
  validateRequest(req, res, schema, next)
}

exports.updateUserValidator = (req, res, next) => {
  const schemaRuler = {
    name: Joi.string().label('Name').min(3).max(32).required().empty(''),
    email: Joi.string()
      .label('Email')
      .min(3)
      .max(32)
      .required()
      .email()
      .empty(''),
    about: Joi.string().label('About').min(10).max(150).empty(''),
  }

  // Only admin can update the role
  if (req.user.role === 'Admin') {
    schemaRuler.role = Joi.string()
      .label('Role')
      .valid('Admin', 'User')
      .required()
      .empty('')
  }
  const schema = Joi.object().keys(schemaRuler)

  validateRequest(req, res, schema, next)
}

exports.updatePasswordValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    password: Joi.string().label('Name').min(6).max(32).required().empty(''),
    newPassword: Joi.string()
      .label('New Password')
      .min(6)
      .max(32)
      .required()
      .empty(''),
    confirmNewPassword: Joi.string()
      .label('Confirm Password')
      .valid(Joi.ref('newPassword'))
      .required()
      .empty(''),
  })
  validateRequest(req, res, schema, next)
}

exports.createCategoryValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().label('Name').min(3).max(32).required(),
  })
  validateRequest(req, res, schema, next)
}

exports.updateCategoryValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .label('Name')
      .min(3)
      .max(32)
      .required()
      .empty('')
  })
  validateRequest(req, res, schema, next)
}
