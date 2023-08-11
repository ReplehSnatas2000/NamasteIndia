import { Campground } from "../models/campground.js";
import { v2 } from "cloudinary";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding.js";
import dotEnv from "dotenv";
dotEnv.config();
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
export async function index(req, res) {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
}
export function newCampground(req, res) {
    res.render("campgrounds/new");
}
export async function createCampground(req, res) {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    const camp = new Campground(req.body.campground);
    camp.geometry = geoData.body.features[0].geometry;
    camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.author = req.user._id;
    await camp.save();
    req.flash("success", "Successfully created tourist site!");
    res.redirect(`/campgrounds/${camp._id}`);
}
export async function showCampground(req, res) {
    let { id } = req.params;
    const camp = await Campground.findById(id).populate({
        path: "reviews",
        populate: { path: "author" }
    });
    res.render("campgrounds/show", { camp });
}
export async function editCampform(req, res) {
    let { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp) {
        req.flash("error", "No site exists by that Id!");
        res.redirect("/campgrounds");
    }
    else res.render("campgrounds/edit", { camp });
}
export async function editCampground(req, res) {
    let { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    let imgArray = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgArray);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await v2.uploader.destroy(filename);
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash("success", "Successfully updated site!");
    res.redirect(`/campgrounds/${campground._id}`);
}
export async function deleteCampground(req, res) {
    let { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
}