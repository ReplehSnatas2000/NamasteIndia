import { User } from "../models/user.js";
export function renderRegister(req, res) {
    res.render("users/register");
}
export async function postRegister(req, res, next) {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash("success", "Welcome to Yelp Camp!");
            res.redirect("/campgrounds");
        });
    }
    catch (e) {
        res.redirect("/register");
    }
}
export function renderLogin(req, res) {
    res.render("users/login");
}
export function postLogin(req, res) {
    req.flash("success", "Logged in successfully");
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}
export function logOut(req, res, next) {
    req.logout(err => {
        if (err) return next(err);
        req.flash("success", "Goodbye!");
        res.redirect("/campgrounds");
    });
}