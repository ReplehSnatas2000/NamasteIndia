import { Review } from "../models/review.js";
import { Campground } from "../models/campground.js";
export async function deleteReview(req, res) {
    const { id, reviewID } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findByIdAndDelete(reviewID);
    res.redirect(`/touristsites/${id}`);
}
export async function postReview(req, res) {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash("success", "Created new review!");
    res.redirect(`/touristsites/${campground._id}`);
}