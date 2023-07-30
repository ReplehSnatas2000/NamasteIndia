import mongoose from "mongoose";
import { Review } from "./review.js";
const Schema = mongoose.Schema;
const imageSchema = new Schema(
    {
        url: String,
        filename: String
    }
);
imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});
const opts = { toJSON: { virtuals: true } };
const campGroundSchema = new Schema({
    title: String,
    price: Number,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [imageSchema],
    description: String,
    location: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
}, opts);
campGroundSchema.virtual("properties.popUpMarkup",).get(function () {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
});
campGroundSchema.post("findOneAndDelete", async doc => {
    if (doc) {
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});
export const Campground = mongoose.model("Campground", campGroundSchema);