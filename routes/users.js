import Express from "express";
import catchAsync from "../utils/catchAsync.js";
import passport from "passport";
import { storeReturnTo } from "../middleware.js";
import { logOut, postLogin, postRegister, renderLogin, renderRegister } from "../controllers/user_controller.js";
export const router3 = Express.Router();
router3.route("/register")
    .post(catchAsync(postRegister))
    .get(renderRegister);
router3.route("/login")
    .get(renderLogin)
    .post(storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), postLogin);
router3.get("/logout", logOut);