const {Pool,Client} = require('pg')
const express=require("express")
const app = express()
const port = 3000
const bodyParsers=require('body-parser')
const config = require("../configs/configs.js")
const schema = require("../models/pampositionModel")
const pool = new Pool(config.dbuat)
app.use(express.json())

const getPamposition = (req,res) =>{
     var {page,limits}= req.query
    pool.query('Select * from pamposition ORDER BY created_date desc LIMIT $2 OFFSET ($1-1)*$2',[page,limits],(err,results)=>{
        if(err)
        {
          return res.json({err:err})
        }
        else
        {
         return res.json({"data":results.rows,"counts":results.rows.length})
        }
     })
}

const searchPamposition = (req,res) =>{
     var locate = req.params.locate
     pool.query("Select * from pamposition WHERE locate LIKE $1",["%"+locate+"%"],(err,results)=>{
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

 const createPamposition = (req,res) =>{
    var {position_name,short_description,description,email,locate,position_status,start_date,end_date,is_active,is_approved,user_id}=req.body
    
    var logg = JSON.stringify(req.body)
  pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
       if(err)
       {
            return res.status(200).json({'err':err})
       }
  })
    if(req.body.position_name===null || req.body.short_description===null  || req.body.description===null  || req.body.email===null|| req.body.position_status===null  || req.body.start_date===null || req.body.end_date===null || req.body.is_active===null || req.body.is_approved===null  || req.body.user_id===null )
    {
         return res.status(400).json({"err":"Something's missing"})
         
    }
    if (schema.validate(req.body).error) 
     {
          return res.status(422).json({'err':schema.validate(req.body).error.details})
     }
     else
     {
          pool.query("insert into pamposition (position_name,short_description,description,email,locate,position_status,start_date,end_date,is_active,is_approved,user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[position_name,short_description,description,email,locate,position_status,start_date,end_date,is_active,is_approved,user_id],(err,results)=>{
               return res.sendStatus(201)
            })
     }
     
}
    /*const delPamposition = (req,res) => {
         var id = Number(req.params.id)
         pool.query("DELETE FROM pamposition WHERE position_id=$1",[id],(err,results)=>{
              if(err)
              {
                   return console.error(err)
              }
              else
              {
                   return res.sendStatus(200)
              }
              
         })
       }*/
    const updatePamposition = (req,res) =>{
         var id = Number(req.params.id)
         var {position_name,short_description,description,email,locate,position_status,start_date,end_date,is_active,is_approved,user_id}=req.body
         
         var logg = JSON.stringify(req.body)
          if (schema.validate(req.body).error) 
          {
               return res.status(422).json({'err':schema.validate(req.body).error.details})
          }
          else
          {
               pool.query("Update pamposition set position_name=$1, short_description=$2, description=$3, email=$4,locate=$5, position_status=$6, start_date=$7,end_date=$8,is_active=$9,is_approved=$10,user_id=$11 WHERE position_id=$12; ",[position_name,short_description,description,email,locate,position_status,start_date,end_date,is_active,is_approved,user_id,id],(err,results)=>{
                    return res.sendStatus(202)
               })
          }
}
module.exports={
    getPamposition,
    searchPamposition,
     createPamposition,
     updatePamposition
}