const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    image:String,
   title:String,
   age:Number,
   userId:String,
   username:String

})
const bookModels=mongoose.model("BOOK",bookSchema)
module.exports={
    bookModels
}