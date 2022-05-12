const {Pool,Client} = require('pg')
const express=require("express")
const app = express()
const port = 3000
const bodyParsers=require('body-parser')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)
const Joi = require('joi')
app.use(express.json())
const schema = Joi.object().keys({
    "title":Joi.string().empty().regex(/^[ก-๛A-Za-z0-9 ]+$/).required(),
    "firstname":Joi.string().empty().regex(/^[ก-๛A-Za-z0-9 ]+$/).required(),
    "email":Joi.string().empty().email().required(),
    "tel":Joi.string().empty().max(10).required(),
    "description":Joi.string().empty().required()
})

module.exports = schema