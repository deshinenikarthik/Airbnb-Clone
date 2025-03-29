const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: {
            filename: String,
            url: String
        },
        default: {
            filename: "default_image",
            url: "https://unsplash.com/photos/woman-in-gold-and-red-dress-DrKGPW1U1_M"
        },
        set: (v) => v === "" ? "https://unsplash.com/photos/woman-in-gold-and-red-dress-DrKGPW1U1_M" : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;