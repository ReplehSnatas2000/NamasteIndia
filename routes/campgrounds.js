import Express from "express";
import catchAsync from "../utils/catchAsync.js";
import {
    createCampground, deleteCampground, editCampform, editCampground,
    index, newCampground, showCampground
} from "../controllers/camp_controller.js";
import { isLoggedIn, isOwner, campGround } from "../middleware.js";
import { storage } from "../cloudinary/index.js";
export const router = Express.Router();
import multer from "multer";
const upload = multer({ storage });
router.route("/")
    .get(catchAsync(index))
    .post(isLoggedIn, upload.array("image"), campGround, catchAsync(createCampground));
router.get("/new", isLoggedIn, newCampground);
router.get("/:id/edit", isLoggedIn, isOwner, catchAsync(editCampform));
router.route("/:id")
    .get(catchAsync(showCampground))
    .put(isLoggedIn, isOwner, upload.array("image"), campGround, catchAsync(editCampground))
    .delete(isLoggedIn, isOwner, catchAsync(deleteCampground));