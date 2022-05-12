
const {Pool,Client} = require('pg')
const express=require("express")
const app = express()
const port = 3000
const bodyParsers=require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const config = require("../configs/configs.js")
const schema = require('../models/pampromotionModel.js')

const pool = new Pool(config.dbuat)

app.use(fileUpload())
app.use(express.json())
const getPampromotion = (req,res) =>{
    var {page,limits}=req.query
    pool.query('Select * from pampromotion ORDER BY created_date DESC LIMIT $2 OFFSET ($1-1)*$2',[page,limits],(err,results)=>{
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

const searchPampromotion = (req,res) =>{
    var subject = req.params.subject
    pool.query("Select * from pampromotion WHERE subject LIKE $1",["%"+subject+"%"],(err,results)=>{
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

const createPampromotion = (req,res) =>{
     var {subject,short_description,description,promotype,promo_status,is_active,start_date,end_date,user_id,images}=req.body
     
     var logg = JSON.stringify(req.body)
     pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
          if(err)
          {
               return res.status(200).json({'err':err})
          }
     })
     
    if(req.body.subject===null || req.body.short_description===null  || req.body.description===null  || req.body.promotype===null  || req.body.promo_status===null || req.body.is_active===null  || req.body.start_date===null  || req.body.end_date===null || req.body.user_id===null)
    {
         return res.status(400).json({err:"somthing's missing"})
         
    }
    if (schema.validate(req.body).error) 
     {
          return res.status(422).json({"err":schema.validate(req.body).error.details})
     }
     else
     {
          pool.query("insert into pampromotion (subject,short_description,description,promotype,promo_status,is_active,start_date,end_date,user_id,images) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",[subject,short_description,description,promotype,promo_status,is_active,start_date,end_date,user_id,images],(err,results)=>{
               return res.sendStatus(201)
          })
     }
}
     const updatePampromotion = (req,res) =>{
          var {subject,short_description,description,promotype,promo_status,is_active,start_date,end_date,user_id,images}=req.body

          var logg = JSON.stringify(req.body)
          pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
          if(err)
          {
               return res.status(200).json({'err':err})
          }
     })
          if(req.body.subject===null || req.body.short_description===null  || req.body.description===null  || req.body.promotype===null  || req.body.promo_status===null || req.body.is_active===null  || req.body.start_date===null  || req.body.end_date===null || req.body.user_id===null||req.body.images===null)
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
          pool.query("UPDATE pamannoucement set subject=$1,short_description=$2,description=$3,promotype=$4,promo_status=$5,is_active=$6,start_date=$7,end_date=$8,user_id=$9,images=$10 WHERE promotion_id=$11",[subject,short_description,description,promotype,promo_status,is_active,start_date,end_date,user_id,images,id],(err,results)=>{
               return res.sendStatus(202)
               })
         }
   }
      
module.exports={
    getPampromotion,
    searchPampromotion,
     createPampromotion,
     updatePampromotion,
}