const express=require("express")
const {Pool,Client} = require('pg')
const app = express()
const port = 3000
const pamcontactCon = require('../controllers/pamcontactCon.js')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)

const router = express.Router()
const bodyParsers=require('body-parser')


router.get('/getPamcontact',pamcontactCon.getPamcontact)
router.post('/createPamcontact',pamcontactCon.createPamcontact )
router.put('/updatePamcontact/:id',pamcontactCon.updatePamcontact)


module.exports=router