import { getDirectories } from "../../api/filesFoldersApi";
import { getFiles } from "../../api/filesFoldersApi";
import { setDir } from "../../service/directories.js";

class FilesGrid extends HTMLElement {
  constructor() {
    super();
    this.activeFile = null;
    this.shadow = this.attachShadow({ mode: "open" });
    // nefunguje - 404
    // const styleLink = document.createElement('style');
    // styleLink.innerText = '@import "./../styles/filebrowser.scss"';
    // shadow.appendChild(styleLink);
    const style = document.createElement("style");
    style.textContent = `
            .main_container{
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
            }
            .folder_up{
                width:70px;
                padding:20px;
            }
        `;
    this.shadow.appendChild(style);

    //main container
    this.container = document.createElement("div");
    this.container.setAttribute("class", "main_container");

    this.shadow.appendChild(this.container);
    this.path = this.getAttribute("path");
  }

  connectedCallback() {
    this.path = this.getAttribute("path");
  }

  static get observedAttributes() {
    return ["path"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const shadow = this.shadowRoot;
    if (name == "path") {
      this.path = newValue;
      this.renderContent(this.path);
    }
  }

  renderContent(path) {
    this.container.innerHTML = "";

    //pokud slozka neni korenova, pridame tlacitko 'o slozku vys'
    if (path.substring(0, path.length - 1).indexOf("/") > -1) {
      const folderUp = document.createElement("div");
      folderUp.setAttribute("class", "folder_up");
      folderUp.innerHTML = `
            <img class='folder_up_icon' src='./../src/images/arrow_back.svg'/>
            `;
      folderUp.addEventListener("click", (e) => {
        this.changePath(
          path.substring(
            0,
            path.substring(0, path.length - 1).lastIndexOf("/") + 1
          )
        );
      });
      this.container.appendChild(folderUp);
    }
    //getting folders from REST API
    const folders = getDirectories(path);
    //adding tiles to the root
    folders.then((folders) => {
      folders.forEach((folder) => {
        setDir(folder);
        const dirElement = document.createElement("dir-tile");
        dirElement.setAttribute("class", "dir-tile");
        dirElement.setAttribute("dir_name", folder.name);
        dirElement.addEventListener("click", (e) => {
          this.activeFile = null;
          this.changePath(path + folder.name + "/");
        });
        this.container.appendChild(dirElement);
      });
    });

    //getting files from REST API
    const files = getFiles(path);
    //adding tiles to the root
    files.then((files) => {
      files.forEach((file) => {
        // setFile(file)
        const fileElement = document.createElement("file-tile");
        fileElement.setAttribute("file_name", file.name);
        fileElement.file = file;
        fileElement.addEventListener("click", (e) => {
          // this.activeFile = fileElement.file;
          this.activeFile = fileElement.file;
        });
        this.container.appendChild(fileElement);
      });
    });
  }
  changePath(path) {
    this.setAttribute("path", path);
    this.path = path;
  }
  hideElement(element) {
    element.style.display = "none";
  }
}
customElements.define("files-grid", FilesGrid);
