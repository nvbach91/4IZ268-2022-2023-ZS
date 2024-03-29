import { goTo } from "../router";

class NavLink extends HTMLElement {
  constructor() {
    super();
    this.selected = false;
    const shadow = this.attachShadow({ mode: "open" })
    
    const style = document.createElement("style");
    style.textContent = `
            .nav_link_wrapper{
                padding: 20px;
            }
        `;
    shadow.appendChild(style);

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "nav_link_wrapper");
    wrapper.innerHTML = `\
            <a class='nav_link'></a>
        `;
    
    shadow.appendChild(wrapper);
  }
  static get observedAttributes() {
    return ["href, text"];
  }
  connectedCallback() {
    const shadow = this.shadowRoot;
    const href = this.getAttribute("href");
    const text = this.getAttribute("text");
    const link = shadow.querySelector(".nav_link");
    link.innerText = text;
    link.href = href;
    link.addEventListener("click", this.onClick);
  }

  onClick = (e) => {
    e.preventDefault();
    const { pathname: path } = new URL(e.target.href);
    goTo(path);
  };
}
customElements.define("nav-link", NavLink);
