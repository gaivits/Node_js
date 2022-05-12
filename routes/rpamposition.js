const express=require("express")
const {Pool,Client} = require('pg')
const app = express()
const port = 3000
const pampositionCon = require('../controllers/pampositionCon.js')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)

const router = express.Router()
const bodyParsers=require('body-parser')


router.get('/getPamposition',pampositionCon.getPamposition)
router.get('/searchPamposition/:locate',pampositionCon.searchPamposition)
router.post('/createPamposition',pampositionCon.createPamposition)
router.put('/updatePamposition/:id',pampositionCon.updatePamposition)


module.exports=router
