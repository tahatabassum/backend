const express= require('express');
const app=express() // server instance create kr rhe hai or server ko bna rha ha
//Get request

app.get("/",(req,res)=>{
    res.send("hlo world");
});

app.get("/contact",(req,res)=>{
    res.send("Contact me bro");
});

app.get("/about",(req,res)=>{
    res.send("About Us");
});

module.exports=app;   //export kr rhe hai app ko taki dusre file me use kr ske