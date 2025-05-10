const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");
main().then(() => {
    console.log("Connect successfull");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'681efa27c3fcadba33d8edfb'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}
initDB();