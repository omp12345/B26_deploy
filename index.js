const express=require("express")
const { connection } = require("./db")
const { userRoutes } = require("./Routes/user.routes")
const { bookroutes } = require("./Routes/book.routes")
const cors=require("cors")
const app=express()
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.use("/users",userRoutes)
app.use("/bookdata",bookroutes)
app.listen(process.env.port,async()=>{
    await connection
    console.log("DB is conncted to server")
    console.log(`port ${process.env.port} is running`)

})
