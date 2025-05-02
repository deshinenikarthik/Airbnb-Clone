const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const User=require("./models/user.js");
const LocalStratergy=require("passport-local");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const methodOverride = require("method-override");
const user = require("./models/user.js");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

main().then(() => {
    console.log("Connect successfull");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.get("/demoUser",async(req,res)=>{
    const fakeUser=new User({
        email:"student@sgmail.com",
        username:"delta-student"
    });
    let registeredUser=await User.register(fakeUser,"helloworld");
    res.send(registeredUser);
});

app.get("/", (req, res) => {
    console.log("Iam a root server");
    res.send("Hi, Iam root");
})
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
})
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{err});
})
app.listen(3000, () => {
    console.log("app is listening");
})