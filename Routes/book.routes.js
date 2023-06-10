const express=require("express")
const { auth } = require("../middleware/Auth.middleware")
const { bookModels } = require("../Module/book.module")
const bookroutes=express.Router()
bookroutes.use(auth)
bookroutes.post("/addbook",async(req,res)=>{
    // logic
    try {
        const bookdata=new bookModels(req.body)
       await bookdata.save()
       res.status(200).json({msg:"book data is added",bookdata})
    } catch (error) {
        res.json(error.message)
    }
})
bookroutes.get("/",async(req,res)=>{
    try {
        const books=await bookModels.find({userId:req.body.userId}) 
        
   res.send(books)
    } catch (error) {
        res.json(error.message)
    }
})
bookroutes.patch("/books/:bookid",async(req,res)=>{
    // logic
    console.log(req.body)
    const userid=req.body.userId
    const {bookid}=req.params
    try {
        const book=await bookModels.findOne({_id:bookid})
        // console.log(book)
        const useridinbook=book.userId
        // console.log(book)
        console.log("useridinbook",useridinbook)
        console.log("userid",userid)
        if(useridinbook===userid){
           
            await bookModels.findByIdAndUpdate({_id:bookid},req.body)
            res.json("updated")
        }else{
            res.json("not athirised")
        }
    } catch (error) {
        res.json("Not authroised")
    }


})

    bookroutes.delete("/books/:bookid",async(req,res)=>{
        // logic
        console.log(req.body)
        const userid=req.body.userId
        const {bookid}=req.params
        try {
            const book=await bookModels.findOne({_id:bookid})
            // console.log(book)
            const useridinbook=book.userId
            // console.log(book)
            console.log("useridinbook",useridinbook)
            console.log("userid",userid)
            if(useridinbook===userid){
               
                await bookModels.findByIdAndDelete({_id:bookid},req.body)
                res.json("dleted")
            }else{
                res.json("not athirised")
            }
        } catch (error) {
            res.json("Not authroised")
        }
    
    
    })



module.exports={
    bookroutes
}