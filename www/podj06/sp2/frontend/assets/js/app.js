import {SearchPage} from "./pages/searchPage.js";
import {StopPage} from "./pages/stopPage.js";
export class App {
    start() {
        $(document).ready(() => {
            let pathName = location.pathname;

            if (pathName === "/" || pathName === "/search") {
                this.loadPage("search", SearchPage);
            }

            if (pathName === "/stop") {
                this.loadPage("stop", StopPage);
            }

        });
    }

    loadPage(pageName, clazz) {
        $("#container").load("/assets/templates/" + pageName + ".html", () => {
            new clazz().init();
        });
    }
}