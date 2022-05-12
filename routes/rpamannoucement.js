const express=require("express")
const {Pool,Client} = require('pg')
const app = express()
const port = 3000
const pamannoucementCon = require('../controllers/pamannoucementCon.js')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)

const router = express.Router()
const bodyParsers=require('body-parser')


router.get('/getPamannoucement',pamannoucementCon.getPamannoucement)
router.get('/searchPamannoucement/:subject',pamannoucementCon.searchPamannoucement)
router.post('/createPamannoucement',pamannoucementCon.createPamannoucement )
router.put('/updatePamannoucement/:id',pamannoucementCon.updatePamannoucement)


module.exports=router