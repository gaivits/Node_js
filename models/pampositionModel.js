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
    "position_name":Joi.string().empty().regex(/^[ก-๛A-Za-z0-9 ]+$/).required(),
    "short_description":Joi.string().empty().required(),
    "description":Joi.string().empty().required(),
    "email":Joi.string().email().empty().required(),
    "locate":Joi.string().empty().required(),
    "position_status":Joi.boolean().empty().required(),
    "start_date":Joi.date().empty().iso().messages({'date.format': `Date format is YYYY-MM-DD`}),
    "start_date":Joi.date().iso().messages({'date.format': `Date format is YYYY-MM-DD`}),
    "end_date":Joi.date().ruleset.greater(Joi.ref('start_date'))
    .rule({ message: 'end_date must be greater than start_date' }).iso().messages({'date.format': `Date format is YYYY-MM-DD`}).required(),
    "is_active":Joi.boolean().empty().required(),
    "is_approved":Joi.boolean().empty().required(),
    "user_id":Joi.number().integer().positive().empty().required()
})

module.exports = schema