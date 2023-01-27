import appConstants from "../common/constants";
import Route from "route-parser";

import MainPage from "../pages/main.template";
import FilesPage from "../pages/files.template";
import LoginPage from "../pages/login.template";

export const routes = {
  Main: new Route(appConstants.routes.index),
  Files: new Route(appConstants.routes.files),
  Login: new Route(appConstants.routes.login),
};

export const render = (path) => {
  let result = "<h1>404</h1>";

  if (routes.Main.match(path)) {
    result = MainPage();
  } else if (routes.Files.match(path)) {
    result = FilesPage();
  } else if (routes.Login.match(path)) {
    result = LoginPage();
  } else {
    result += path;
  }
  document.querySelector("#app").innerHTML = result;
};

export const goTo = (path) => {
  window.history.pushState({ path }, path, path);
  render(path);
};

const initRouter = () => {
  window.addEventListener("popstate", (e) => {
    render(new URL(window.location.href).pathname);
  });
  document.querySelectorAll('[href^="/"]').forEach((el) => {
    el.addEventListener("click", (env) => {
      env.preventDefault();
      const { pathname: path } = new URL(env.target.href);
      goTo(path);
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
