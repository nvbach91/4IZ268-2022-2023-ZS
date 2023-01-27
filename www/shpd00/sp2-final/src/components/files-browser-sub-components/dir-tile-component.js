class dirTile extends HTMLElement {
  constructor() {
    super();
    this.selected = false;
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
            .container{
                padding: 20px;
                max-width: 100px;
            }
            .dir_icon{
                width: 100px;
                display: block;
            }
            .dir_name_wrapper{
                word-wrap: break-word;
                text-align : center
            }
        `;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.setAttribute("class", "container");
    container.innerHTML = `
            <img class='dir_icon' src='./../src/images/dir_icon.svg'/>
        `;
    const dirNameWrapper = document.createElement("div");
    dirNameWrapper.setAttribute("class", "dir_name_wrapper");
    dirNameWrapper.innerText = "undefined";
    container.appendChild(dirNameWrapper);

    shadow.appendChild(container);
  }
  static get observedAttributes() {
    return ["dir_name"];
  }
  connectedCallback() {
    this.shadowRoot.querySelector(".dir_name_wrapper").innerText =
      this.getAttribute("dir_name");
  }
}
customElements.define("dir-tile", dirTile);
