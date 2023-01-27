class NavPath extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: "open"});

    const style = document.createElement("style");
    style.innerText= `
      .main_container{
        padding:12px;
        padding-left:20px;
      }
      h1{
        padding: 0;
        margin: 0;
      }
    `;
    this.shadow.appendChild(style);

    const container = document.createElement("div");
    container.setAttribute("class", "main_container");
    container.innerHTML = `
            <h1 id='path_header'></h1>
    `;
    this.shadow.appendChild(container);
  }

  static get observedAttributes() {
    return ["path"];
  }

  attributeChangedCallback(attrName, oldVal, newVal){
    if (attrName="path"){
      this.shadow.getElementById("path_header").innerText=newVal;
    }
  }
}
customElements.define("nav-path", NavPath);

