const {Pool,Client} = require('pg')
const express=require("express")
const app = express()
const port = 3000
const bodyParsers=require('body-parser')
const config = require("../configs/configs.js")
const pool = new Pool(config.dbuat)
const Joi = require('joi')
const schema = require('../models/pamcontactModel.js')


// function isEmpty(Obj)
// {
//      return Object.keys(Obj).length===0
// }


const getPamcontact = (req,res) =>{
    var {page,limits}= req.query
    pool.query('Select * from pamcontact ORDER BY created_date desc LIMIT $2 OFFSET ($1-1)*$2',[page,limits],(err,results)=>{
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

const createPamcontact = (req,res) =>{
  var {title,firstname,email,tel,description}=req.body
  var logg = JSON.stringify(req.body)
  pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
       if(err)
       {
            return res.status(200).json({'err':err})
       }
  })
   if(req.body.title===null||req.body.firstname===null||req.body.email===null||req.body.tel===null||req.body.description===null)
     {   
        res.status(400).json({"err":"Something's missing"})
     }
     if(schema.validate(req.body).error)
     {
               return res.status(422).json(schema.validate(req.body).error.details)           
     }
     else 
     {
               pool.query("insert into pamcontact (title,firstname,email,tel,description) values ($1,$2,$3,$4,$5);",[title,firstname,email,tel,description],(err,results)=>{
                    return res.sendStatus(201)
               })   
     }
}

  /*const delPamcontact = (req,res) => {
  var id = Number(req.params.id)
  pool.query("DELETE FROM pamcontact WHERE contact_id=$1",[id],(err,results)=>{
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

const updatePamcontact = (req,res) =>{
  var id = Number(req.params.id)
  var {title,firstname,email,tel,description}=req.body
  var logg = JSON.stringify(req.body)
  pool.query('INSERT INTO pamactivity_log (information,methods) VALUES ($1,$2)',[logg,req.method],(err,result)=>{
       if(err)
       {
            return res.status(200).json({'err':err})
       }
  })
  if(req.body.title===null||req.body.firstname===null||req.body.email===null||req.body.tel===null||req.body.description===null)
     {   
        res.status(400).json({"err":"Something's missing"})
     }
  if(schema.validate(req.body).error)
  {
       return res.status(422).json({'err':schema.validate(req.body).error.details})
  }
  else
  {
     pool.query("Update pamcontact set title=$1, firstname=$2,email=$3, tel=$4, description=$5 WHERE contact_id=$6; ",[title,firstname,email,tel,description,id],(err,results)=>{
          return res.sendStatus(202)
     })
  }
  
}
module.exports={
    getPamcontact,
    createPamcontact,
    updatePamcontact,
}