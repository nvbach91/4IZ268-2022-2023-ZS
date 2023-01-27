class ContentView extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
            .main_container{
                padding: 2em;
                padding-top:0;
                border:2px;
            }
            // .file_name{
            // }
        `;
    this.shadow.appendChild(style);

    this.container = document.createElement("div");
    this.container.setAttribute("class", "main_container");

    this.fileName = document.createElement("h2");
    this.fileName.setAttribute("class", "file_name");
    this.content_container = document.createElement("div");
    this.content_container.setAttribute("class", "content");

    this.container.appendChild(this.fileName);
    this.container.appendChild(this.content_container);

    this.shadow.appendChild(this.container);
  }
  static get observedAttributes() {
    return ["content", "file_name"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const shadow = this.shadowRoot;
    if (name == "content") {
      this.content_container.innerHTML = newValue;
    }
    if (name == "file_name") {
      this.fileName.innerHTML = newValue;
    }
  }
}
customElements.define("content-view", ContentView);
