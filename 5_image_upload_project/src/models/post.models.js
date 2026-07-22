const mongoose = require("mongoose");

const schema=new mongoose.Schema({
        image:String,
        caption:String
})

const postModel=mongoose.model("post",schema)  // Compiles Schema into a Mongoose Model named postModel

module.exports=postModel