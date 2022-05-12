const express=require("express")
const app = express()
const port = 3000
var fs = require('fs')
var path = require('path')
const fileUpload = require('express-fileupload')
const bodyParsers=require('body-parser')


app.use(fileUpload())
app.use(express.json())
app.use(bodyParsers.urlencoded({extended:false}))

const rpamcontact = require('./routes/rpamcontact.js')
const rpamposition = require('./routes/rpamposition.js')
const rpampromotion = require('./routes/rpampromotion.js')
const rpamannoucement = require('./routes/rpamannoucement.js')


app.get('/',(req,res)=>{
   res.send('Hello')
})


app.use('/api',rpamcontact)
app.use('/api',rpamposition)

app.use('/api',rpampromotion)
app.use('/api',rpamannoucement)

app.listen(port,()=>{
    console.log('http',"Server listening at 3000 ")
})
