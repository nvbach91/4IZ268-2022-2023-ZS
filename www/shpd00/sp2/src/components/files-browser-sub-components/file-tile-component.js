class FileTile extends HTMLElement {
  constructor() {
    super();
    this.selected = false;
    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.setAttribute("class", "main_container");
    container.innerHTML = `
            <img class='file_icon' src='./../src/images/file_icon.svg'/>
        `;
    const fileNameWrapper = document.createElement("div");
    fileNameWrapper.setAttribute("class", "file_name_container");
    container.appendChild(fileNameWrapper);

    const style = document.createElement("style");
    style.textContent = `
            .main_container{
                padding: 20px;
                max-width: 100px;
            }
            .file_icon{
                height : 100px;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            .file_name_container{
                word-wrap: break-word;
                text-align : center
            }
        `;
    shadow.appendChild(style);
    shadow.appendChild(container);
  }
  static get observedAttributes() {
    return ["file_name"];
  }
  connectedCallback() {
    const shadow = this.shadowRoot;
    shadow.querySelector(".file_name_container").innerText =
      this.getAttribute("file_name");
  }
}
customElements.define("file-tile", FileTile);
