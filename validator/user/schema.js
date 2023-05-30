const Joi = require("joi");

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  userName: Joi.string().min(4).required(),
  password: Joi.string().min(8).required(),
}).unknown();

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown();


module.exports = { createUserSchema, loginUserSchema };