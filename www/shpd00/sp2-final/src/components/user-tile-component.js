// import { getUser } from "../api/userApi";
// import { goTo } from "../router";
// import "./../styles/usertile.scss"
import { logOut, switchUser  } from "../service/activeUsers";

class UserTile extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
            .main_container{
                display: flex;
                flex-direction: row;
                justify-content: center;
            }
            .username_container{
                font-size: 2em;
                width:7em;
            }
            .username{
              float:left;
            }
            .logout_btn_container{
              height:3em;
              justify-content:right;
              padding-top:0.5em;
              padding-left:2em;
            }
            .logout_btn{
              width:100%;
              height:2em;
              float:right;
              // padding-top:0.5em;
            }
        `;
    shadow.appendChild(style);

    const container = document.createElement("div");
    container.setAttribute("class", "main_container");
    container.setAttribute("part", "main_container");
    container.innerHTML = `
            <div class="username_container" part="username_container">
                <div class="username" part="username"></div>
            </div>
            <div class="logout_btn_container" part="logout_btn_container">
                <button class="logout_btn" part="logout_btn">Log out</button>
            </div>
    `;
    const logOutButton = container.getElementsByClassName("logout_btn")[0];
    this.username=this.getAttribute('username');
    container.querySelector(".username").addEventListener("click",(e)=>{switchUser(this.username)});
    logOutButton.addEventListener("click", (e)=>logOut(this.username) )



    shadow.appendChild(container);
  }
  // static get observedAttributes() {
  //   return ["file_name"];
//   }
  connectedCallback() {
    const shadow = this.shadowRoot;
    this.username=this.getAttribute('username');
    shadow.querySelector(".username").innerText = this.username;
  }



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
customElements.define("user-tile", UserTile);

