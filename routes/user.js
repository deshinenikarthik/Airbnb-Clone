const express=require("express");
const { route } = require("./listing");
const wrapAsync = require("../utils/wrapAsync");
const router=express.Router();
const User=require("../models/user.js");
const passport = require("passport");

router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs");
})

router.post("/signUp",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registereduser=User.register(newUser,password);
        req.flash("success","Welcome to Wanderlust!");
        res.redirect("/listings");
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signUp");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(async(req,res)=>{
    req.flash("success","Welcome to Wanderlust! You are logged in.");
    res.redirect("/listings");
}))

module.exports=router;