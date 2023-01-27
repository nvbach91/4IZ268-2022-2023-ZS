import "./files-browser-sub-components"
import { goTo } from "../router";
import { getActualUser } from "../service/activeUsers.js";
import { getFileContent } from "../api/filesFoldersApi";

class FilesBrowser extends HTMLElement {
  constructor() {
    super();
    if (getActualUser() == null || typeof getActualUser() == "undefined") {
      goTo("/login");
      return;
    }
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.innerText = `
    .main_container{
        width:100%;
        height:fit-content;
        margin:0;
        padding:0;
    }
    .two_column_container{
        display:flex
    }
    .au_container{
        // position:relative;
        // flex: right;
        margin-left:auto;
        margin-right:0;
        padding-right:2em;
        align-text:right;
        // font-size:1.5em
    }
    .fg_container{
       flex: 65;
    }
    .fv_container{
        flex: right;
        max-width:35vw;
        margin-right: 0;
        margin-left:auto;
        border-style:solid;
    }
}  `;
    this.shadow.appendChild(style);
    // const styleLink = document.createElement('style');
    // styleLink.innerText = '@import "./../styles/filebrowser.scss"';
    // shadow.appendChild(styleLink);

    //struktura stranky a elementy
    const container = document.createElement("div");
    container.setAttribute("class", "main_container");

    const headerContainer = document.createElement("div");
    headerContainer.setAttribute("class", "two_column_container");

    const pathHeaderContainer = document.createElement("div");
    pathHeaderContainer.setAttribute("class", "ph_container");
    this.activePath = "/";
    this.pathHeader = document.createElement("nav-path");
    this.pathHeader.setAttribute("path", this.activePath);
    pathHeaderContainer.appendChild(this.pathHeader);

    const activeUserContainer = document.createElement("div");
    activeUserContainer.setAttribute("class", "au_container");
    activeUserContainer.addEventListener("click", (e) => {
      goTo("/login");
    });
    const activeUserName = document.createElement("h2");
    activeUserName.setAttribute("class", "username");
    activeUserName.innerText = getActualUser().username;
    activeUserContainer.appendChild(activeUserName);

    headerContainer.appendChild(pathHeaderContainer);
    headerContainer.appendChild(activeUserContainer);
    container.appendChild(headerContainer);

    const twoColumnContainer = document.createElement("div");
    twoColumnContainer.setAttribute("class", "two_column_container");

    const filesGridContainer = document.createElement("div");
    filesGridContainer.setAttribute("class", "fg_container");
    this.filesGrid = document.createElement("files-grid");
    this.filesGrid.addEventListener("click", (e) => this.refresh());
    this.filesGrid.setAttribute("path", this.activePath);
    filesGridContainer.appendChild(this.filesGrid);
    this.fileView = document.createElement("content-view");
    this.fileViewContainer = document.createElement("div");
    this.fileViewContainer.setAttribute("class", "fv_container");
    this.fileViewContainer.appendChild(this.fileView);

    twoColumnContainer.appendChild(filesGridContainer);
    twoColumnContainer.appendChild(this.fileViewContainer);

    container.appendChild(twoColumnContainer);
    this.shadow.appendChild(container);
  }

  connectedCallback() {
    this.refresh();
  }

  refresh() {
    this.activePath = this.filesGrid.path;
    this.pathHeader.setAttribute("path", this.activePath);
    this.activeFile = this.filesGrid.activeFile;
    if (this.activeFile == null) {
      this.fileViewContainer.setAttribute(
        "style",
        "display:none;border-style:hidden"
      );
    } else {
      this.fileViewContainer.setAttribute("style", "");
      this.fileView.setAttribute("file_name", this.activeFile.name);
      const fileContentRequest = getFileContent(this.activeFile);
      fileContentRequest.then((content) => {
      this.fileView.setAttribute("content", content[0].content);
      })



      // this.fileView.setAttribute("file_name", this.activeFile.name);
      // this.fileView.setAttribute("content", this.activeFile.content);
    }
  }
}
customElements.define("files-browser", FilesBrowser);
