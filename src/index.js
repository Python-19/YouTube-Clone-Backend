import dotenv from 'dotenv'
import express from "express"
import mongoose from 'mongoose'
import { DB_NAME } from './constants.js'
import connectDB from './db/db.js'
import {app} from "./app.js"
dotenv.config({
  path:'./env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT  || 8000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
  }) 
})
.catch((err)=>{
  console.log("Mongodb connection failed !!!!",err)
})


/*
import express from 'express'
(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    application.on("error",(error)=>{
      console.log("ERRR:",error);
      throw error
    })
    application.listen(process.env.PORT,()=>{
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  }catch(error) {
    console.error("ERROR",error)
    throw err
  }
})
*/