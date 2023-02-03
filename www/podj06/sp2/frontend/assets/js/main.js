import {App} from "./app.js";

let app = new App();
app.start();

document.querySelectorAll(".homeRedirect").forEach((el) => {
   el.onclick = () => {
       app.redirect('/');
   }
});