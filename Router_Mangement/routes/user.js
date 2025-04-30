const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("HI this is users");
})
router.get("/:id",(req,res)=>{
    res.send("Hi this is show user");
})
router.post("/",(req,res)=>{
    res.send("Hi this is to add new User");
})
module.exports=router;