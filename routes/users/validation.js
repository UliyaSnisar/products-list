const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const { HttpCode } = require('../../config/constants')

const patternPassword = '^[a-zA-Z0-9]{3,30}$'

const schemaSignupUser = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).pattern(new RegExp(patternPassword)).required(),
});

const schemaLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).pattern(new RegExp(patternPassword)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateSignupUser = async (req, res, next) => {
  return await validate(schemaSignupUser, req.body, res, next);
};

module.exports.validateLoginUser = async (req, res, next) => {
  return await validate(schemaLoginUser, req.body, res, next);
};