import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
app.use(express.json({limit:"16kb"}))//accept json data with limit
app.use(express.urlencoded({extended:true,limit:"16kb"}))//accept url
app.use(express.static("public"))
app.use(cookieParser())

//router import
import userRouter from "./routes/user.routes.js"

//routers declaration
app.use("/api/v1/users",userRouter)
//routes declaration
//http://localhost:8000/api/v1/users/register
export {app}