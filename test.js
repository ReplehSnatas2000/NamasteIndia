// import { Client } from "@googlemaps/google-maps-services-js";
// const client = new Client({});

// client
//     .elevation({
//         params: {
//             locations: [{ lat: 45, lng: -110 }],
//             key: "asdf",
//         },
//         timeout: 1000, // milliseconds
//     })
//     .then((r) => {
//         console.log(r.data.results[0].elevation);
//     })
//     .catch((e) => {
//         console.log(e.response.data.error_message);
//     });
// import sanitizeHtml from "sanitize-html";
// console.log(sanitizeHtml("<script></script>"));
let z = (function sum45(x, y) {
    return (x + y) % 45;
})(6, 67);
console.log(z);