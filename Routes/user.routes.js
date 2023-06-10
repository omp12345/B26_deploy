const express=require("express")
const userRoutes=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModule } = require("../Module/user.moduke")
userRoutes.post("/register",(req,res)=>{
    const {name,email,pass}=req.body
    const user=userModule.findOne({email})
    if(user){
       res.json({msg:"user already registerd"}) 
    }else{
        try {
            bcrypt.hash(pass,5,async(err,hash)=>{
                if(err){
                    console.log("pass is not hashed")
                }else{
                  const userdata=new userModule({name,email,pass:hash})
                await userdata.save()
                res.status(200).json({msg:"pass has been hashed"})
    
                }
            })
        } catch (error) {
            res.status(400).json({msg:"Something is Wrong"})
        }
        
    }
 
    
})
userRoutes.post("/login",async(req,res)=>{
    // logic here
    const {email,pass}=req.body
    try {
        const user= await userModule.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:user._id,username:user.name},process.env.secret)
                    res.status(200).json({msg:"Login SUccesfully",token})

                }else{
                    res.status(200).json({msg:"Plese Login"})
                }
            })
        }else{
            res.status(200).json({msg:"user is not found"})
        }
       
    } catch (error) {
        res.status(400).json({msg:"Something is error"})
    }

})
userRoutes.post("/logout",(req,res)=>{
    // logic here
})
module.exports={
    userRoutes
}