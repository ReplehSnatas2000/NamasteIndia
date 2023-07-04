import mongoose from "mongoose";
const Schema = mongoose.Schema;
const campGroundSchema = new Schema({
    title: String,
    price: Number,
    image: String,
    description: String,
    location: String
});
export const Campground = mongoose.model("Campground", campGroundSchema);