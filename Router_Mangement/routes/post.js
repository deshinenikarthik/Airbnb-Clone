const express=require("express");
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("HI this is posts");
})
router.get("/:id",(req,res)=>{
    res.send("Hi this is show post");
})
router.post("/",(req,res)=>{
    res.send("Hi this is to add new post");
})

module.exports=router;