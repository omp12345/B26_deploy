const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
try {
    const decoded=jwt.verify(token,process.env.secret)
    if(decoded){
    //    console.log(decoded)
        req.body.userId=decoded.userId
        req.body.username=decoded.username
       next()
    }else{
        res.status(200).json({msg:"You are not Autherised"})
    }
} catch (error) {
    res.status(400).json({msg:error.message})
}

}
module.exports={
    auth
}
