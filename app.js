import Express, { urlencoded } from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import mongoose from "mongoose";
import { Campground } from "./campground.js";
import ejsMate from "ejs-mate";
import AppError from "./utils/ErrorHandler.js";
import catchAsync from "./utils/catchAsync.js";
import { campgroundSchema } from "./utils/validateSchema.js";
mongoose.connect("mongodb://127.0.0.1:27017/YelpCamp")
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log(err);
    });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = Express();
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(urlencoded({ extended: true }));
app.use(Express.json());
function campGround(req, res, next) {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message);
        throw new AppError(msg, 400);
    }
    else next();
}
app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}));
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});
app.post("/campgrounds", campGround, catchAsync(async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`);
}));
app.get("/campgrounds/:id", catchAsync(async (req, res) => {
    let { id } = req.params;
    const camp = await Campground.findById(id);
    res.render("campgrounds/show", { camp });
}));
app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
    let { id } = req.params;
    const camp = await Campground.findById(id);
    res.render("campgrounds/edit", { camp });
}));
app.put("/campgrounds/:id", campGround, catchAsync(async (req, res) => {
    let { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}));
app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
    let { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}));
app.all("*", (req, res, next) => {
    next(new AppError("Page not found!!!", 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something Went Wrong";
    res.status(statusCode).render("error", { err });
});
app.listen(1000, () => {
    console.log("Connected to 1000");
});