import { getActiveUsers} from "../service/activeUsers";

class UsersList extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
            .main_container{
                text-align: center;
                justify-content: center;
                margin-left:auto;
                margin-right:auto;
            }
        `;
    shadow.appendChild(style);
    
    const container = document.createElement("div");
    container.setAttribute("class", "main_container");
    container.setAttribute("part", "main_container");
    
    const activeUsers = getActiveUsers();
    activeUsers.forEach(element => {
        const userTile = document.createElement('user-tile');
        userTile.setAttribute("username",element.username);
        container.appendChild(userTile);
    });

    shadow.appendChild(container);
  }
}
customElements.define("users-list", UsersList);

