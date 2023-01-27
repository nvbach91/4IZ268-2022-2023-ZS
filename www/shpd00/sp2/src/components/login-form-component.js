import { getUser } from "../api/userApi";
import { goTo } from "../router";
import { addUser,switchUser,getActiveUsers } from "../service/activeUsers";
import "./../styles/loginform.scss"

class LoginForm extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const login = function tryLogIn(){
      const username = shadow.getElementById('username_input').value;
      const password = shadow.getElementById('password_input').value;
      const userRequest = getUser(username,password);
      userRequest.then((user) => {
        if(user.length!=1){
          shadow.getElementById('login_error_container').innerText='Authentication error';
        }else{
          const userid = user[0].userid;
          localStorage.setItem('actualUserId',userid);
          addUser(user[0]);
          switchUser(user[0].username);
        }
      });
    }

    const container = document.createElement("div");
    container.setAttribute("class", "main_container");
    container.setAttribute("part", "main_container");
    container.innerHTML = `
            <h2>USERNAME</h2>
            <input id="username_input" part="input"/>
            <h2>PASSWORD</h2>
            <input id="password_input" part="input"/>
            <div id="login_error_container" part="login_error_container"></div>
    `;
    const logInButton = document.createElement("button");
    logInButton.setAttribute("class", "log_in_button");
    logInButton.setAttribute("part", "log_in_button");
    logInButton.innerText = 'Log in'
    logInButton.addEventListener("click", login )
    container.appendChild(logInButton);
    if(getActiveUsers().length>0){
      const usersListContainer = document.createElement("div")
      usersListContainer.innerHTML=`
        <h3>Or continue as:</h3>
        <users-list></users-list>
      `;
      container.appendChild(usersListContainer);
    }
    shadow.appendChild(container);
  }
  // static get observedAttributes() {
  //   return ["file_name"];
  // }
  // connectedCallback() {
  //   const shadow = this.shadowRoot;
  //   shadow.querySelector(".file_name_wrapper").innerText =
  //     this.getAttribute("file_name");
  // }



  // onClick = (e) => {
  //     e.preventDefault()
  //     if(!this.selected){
  //         const { pathname: path} = new URL(e.target.fileLocation)
  //         goTo(path)
  //     }
  // }
}
// function tryLogIn(){
//   const username = document.querySelector('login-form .username_input').value;
//   // const password = document.querySelector('login-form .password_input').value;
//   const test = document.createElement("h2");
//   test.innerText = "test";
//   document.querySelector('login-form').appendChild(test);
// }
customElements.define("login-form", LoginForm);

