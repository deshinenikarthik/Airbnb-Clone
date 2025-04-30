const express=require("express");
const app=express();
const users=require("./routes/user.js")
const posts=require("./routes/post.js")
const cookieParser=require("cookie-parser");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(cookieParser());

const session=require("express-session");
const flash=require("connect-flash");
app.use(flash());
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));
app.use((req,res,next)=>{
    res.locals.msg=req.flash("success");
    next();
})
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","User registered successfully!");
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    res.render("page.ejs",{name:req.session.name});
})
//Users
app.use("/users",users);
//Posts
app.use("/posts",posts);

app.get("/",(req,res)=>{
    res.send("Hi iam root!");
})
app.listen(3000,()=>{
    console.log("App is listening!");
})