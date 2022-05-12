const express=require("express")
const {Pool,Client} = require('pg')
const app = express()
const port = 3000
const pampromotionCon = require('../controllers/pampromotionCon.js')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)

const router = express.Router()
const bodyParsers=require('body-parser')


router.get('/getPampromotion',pampromotionCon.getPampromotion)
router.get('/searchPampromotion/:subject',pampromotionCon.searchPampromotion)
router.post('/createPampromotion',pampromotionCon.createPampromotion )
router.put('/updatePampromotion/:id',pampromotionCon.updatePampromotion)


module.exports=router