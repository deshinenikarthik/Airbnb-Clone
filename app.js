const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));

const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

main().then(() => {
    console.log("Connect successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
        if(error){
            throw new ExpressError(400,error);
        }else{
            next(); 
        }
}

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
})
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}))
app.post("/listings",validateListing, wrapAsync(async (req, res,next) => {
        
        const listing = req.body.listing;
        console.log(listing);
        const newListing = new Listing(listing);
        await newListing.save();
        res.redirect("/listings");
    }
))
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}))
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successfull Testing");
// })
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