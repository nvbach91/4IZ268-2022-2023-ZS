// import { getUser } from "../api/userApi";
// import { goTo } from "../router";
// import "./../styles/loginform.scss"
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
  // static get observedAttributes() {
  //   return ["file_name"];
//   }
//   connectedCallback() {
//     const shadow = this.shadowRoot;
//     this.username=this.getAttribute('username');
//     shadow.querySelector(".username").innerText ='test';
//   }



  // onClick = (e) => {
  //     e.preventDefault()
  //     if(!this.selected){
  //         const { pathname: path} = new URL(e.target.fileLocation)
  //         goTo(path)
  //     }
  // }

// function tryLogIn(){
//   const username = document.querySelector('login-form .username_input').value;
//   // const password = document.querySelector('login-form .password_input').value;
//   const test = document.createElement("h2");
//   test.innerText = "test";
//   document.querySelector('login-form').appendChild(test);
// }
}
customElements.define("users-list", UsersList);

