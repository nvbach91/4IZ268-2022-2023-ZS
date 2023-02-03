import {SearchPage} from "./pages/searchPage.js";
import {StopPage} from "./pages/stopPage.js";
export class App {
    start() {
        this.setStateListener();
        $(document).ready(() => {
            this.selectPage(location.pathname);
        });
    }

    selectPage(pathName) {
        if (pathName === "/stop") {
            this.loadPage("stop", StopPage);
            return;
        }

        this.loadPage("search", SearchPage);
    }

    redirect(path) {
        history.pushState([], "", path);
        let parser = document.createElement("a");
        parser.href = path;

        this.selectPage(parser.pathname);
    }

    loadPage(pageName, clazz) {
        $("#container").load("/assets/templates/" + pageName + ".html", () => {
            new clazz(this).init();
        });
    }

    setStateListener() {
        window.onpopstate = (event) => {
            this.selectPage(event.target.location.pathname);
        }
    }
}