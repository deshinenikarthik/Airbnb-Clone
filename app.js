const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const flash=require("connect-flash");
app.use(flash());
const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

main().then(() => {
    console.log("Connect successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

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