const express = require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next(); 
    }
}

router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    // console.log(allListings);
    res.render("listings/index.ejs", { allListings });
})
router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new.ejs");
})
router.get("/:id",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        res.redirect("/listings");
    }else{
        res.render("listings/show.ejs", { listing });
    }
}))
router.post("/",validateListing,isLoggedIn, wrapAsync(async (req, res,next) => {        
        const listing = req.body.listing;
        console.log(listing);
        const newListing = new Listing(listing);
        await newListing.save();
        req.flash("success","New Listing Created!");
        res.redirect("/listings");
    }
))
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!");
        res.redirect("/listings");
    }else{
        res.render("listings/edit.ejs", { listing });
    }
}))
router.put("/:id",isLoggedIn,validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}))
router.delete("/:id",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Deleted Listing!");
    res.redirect("/listings");
}))
module.exports=router;