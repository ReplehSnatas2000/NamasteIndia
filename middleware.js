import { Campground } from "./models/campground.js";
import { Review } from "./models/review.js";
import { campgroundSchema, reviewSchema } from "./utils/validateSchema.js";
import AppError from "./utils/ErrorHandler.js";
export function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be signed in!");
        res.redirect("/login");
    }
    else next();
}
export function storeReturnTo(req, res, next) {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
export async function isOwner(req, res, next) {
    let { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have the permission to do that!");
        res.redirect(`/campgrounds/${campground._id}`);
    }
    else next();
}
export async function isReviewOwner(req, res, next) {
    let { id, reviewID } = req.params;
    const review = await Review.findById(reviewID);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have the permission to do that!");
        res.redirect(`/campgrounds/${id}`);
    }
    else next();
}
export function campGround(req, res, next) {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message);
        throw new AppError(msg, 400);
    }
    else next();
}
export function validateReview(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message);
        throw new AppError(msg, 400);
    }
    else next();
}