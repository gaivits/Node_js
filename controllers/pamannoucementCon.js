const {Pool,Client} = require('pg')
const express=require("express")
const app = express()
const port = 3000
const bodyParsers=require('body-parser')
const config = require("../configs/configs.js")
const fs = require('fs')
const schema= require("../models/pamannoucementModel.js")
const pool = new Pool(config.dbuat)
app.use(express.json())

const getPamannoucement = (req,res) =>{
    var {page,limits}=req.query
    pool.query('Select * from pamannoucement ORDER BY created_date DESC LIMIT $2 OFFSET ($1-1)*$2',[page,limits],(err,results)=>{
        if(err)
        {
          res.status(400).json({"err":"Something's missing"})
        }
        else
        {
         return res.json({"data":results.rows,"counts":results.rows.length})
        }
        
    })
}

const searchPamannoucement = (req,res) =>{
     var subject = req.params.subject
     pool.query("Select * from pamannoucement WHERE subject LIKE $1",["%"+subject+"%"],(err,results)=>{
         if(err)
         {
           res.status(400).json({"err":err})
         }
         else
         {
          return res.json({"data":results.rows,"counts":results.rows.length})
         }
         
     })
  }

const createPamannoucement = (req,res) =>{
     var {subject,short_description,description,annoucetype,announce_status,is_active,start_date,end_date,user_id,images}=req.body
     var files = req.files.images.data
     var filesText = new Buffer.from(files)
     var b64dat = filesText.toString("base64")
     var logg = JSON.stringify(req.body)
     pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
          if(err)
          {
               return res.status(200).json({'err':err})
          }
     })
    if(req.body.subject===null || req.body.short_description===null  || req.body.description===null  || req.body.annoucetype===null  || req.body.announce_status===null || req.body.is_active===null  || req.body.start_date===null  || req.body.end_date===null || req.body.user_id===null)
    {
         return res.status(400).json({err:"somthing's missing"})
         
    }
    if (schema.validate(req.body).error) 
     {
          return res.status(402).json({'err':schema.validate(req.body).error.details})
     }
     else
     {
          pool.query("insert into pamannoucement (subject,short_description,description,annoucetype,announce_status,is_active,start_date,end_date,user_id,images) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",[subject,short_description,description,annoucetype,announce_status,is_active,start_date,end_date,user_id,images],(err,results)=>{
              return res.sendStatus(201)
          })
     }
}
     
const updatePamannoucement = (req,res) =>{
          var id = Number(req.params.id)
          var {subject,short_description,description,annoucetype,announce_status,is_active,start_date,end_date,user_id,images}=req.body
          var logg = JSON.stringify(req.body)
          pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
          if(err)
          {
               return res.status(200).json({'err':err})
          }
     })
          if(req.body.subject===null || req.body.short_description===null  || req.body.description===null  || req.body.promotype===null  || req.body.promo_status===null || req.body.is_active===null  || req.body.start_date===null  || req.body.end_date===null || req.body.user_id===null)
          {
               res.status(400).json({
                    err:"something's missing"
               })
         }
         if (schema.validate(req.body).error) 
         {
              return res.status(422).json({err:schema.validate(req.body).error.details})
         }
         else
         {
          pool.query("UPDATE pamannoucement set subject=$1,short_description=$2,description=$3,annoucetype=$4,announce_status=$5,is_active=$6,start_date=$7,end_date=$8,user_id=$9,images=$10 WHERE annouce_id=$11",[subject,short_description,description,annoucetype,announce_status,is_active,start_date,end_date,user_id,images,id],(err,results)=>{
               return res.sendStatus(202)
               })
         }
} 
module.exports={
    getPamannoucement,
    searchPamannoucement,
     createPamannoucement,
     updatePamannoucement,

}