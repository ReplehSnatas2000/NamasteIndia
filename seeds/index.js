import mongoose from "mongoose";
import { Campground } from "../models/campground.js";
import cities from "./cities.js";
import { descriptors, places } from "./seedHelper.js";
import axios from "axios";
mongoose.connect("mongodb://127.0.0.1:27017/YelpCamp")
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log(err);
    });
function sample(arr) {
    const i = Math.floor(Math.random() * arr.length);
    return arr[i];
}
async function seedImg() {
    try {
        const resp = await axios.get("https://api.unsplash.com/photos/random", {
            params: {
                client_id: "R_d9wJcseM94i6zAM8BrBi9Rw7yRVYid49xssEPsZJU",
                collections: 1114848
            },
        });
        return resp.data.urls.small;
    }
    catch (err) {
        console.error(err);
    }
}
const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            author: "64b254485f3f5cb45d30d39c",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/db2rejptr/image/upload/v1689754748/YelpCamp/looltufpcnmjknshfbg4.jpg',
                    filename: 'YelpCamp/looltufpcnmjknshfbg4'
                },
                {
                    url: 'https://res.cloudinary.com/db2rejptr/image/upload/v1689754748/YelpCamp/w57dztljxajoqoicimux.jpg',
                    filename: 'YelpCamp/w57dztljxajoqoicimux'
                }
            ],
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi expedita consequatur, vero provident tempore rerum mollitia. Libero rem nihil ipsa a nam dolor minima nobis ea consequatur possimus, voluptas sint.",
            price
        });
        await c.save();
    }
}
seedDb();