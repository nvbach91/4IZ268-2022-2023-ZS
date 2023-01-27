import { goTo } from "../router";

let activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
if ( activeUsers==null || typeof activeUsers =='undefined' ){
    activeUsers=[];
    localStorage.setItem("activeUsers",JSON.stringify(activeUsers));
}

let actualUser= null;



// function addUser(user){
//     activeUsers.push(user);
//     localStorage.setItem("activeUsers",activeUsers);
// }

export const addUser = (user) => {
  activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
  for (let i=0; i<activeUsers.length; i++){
    if(activeUsers[i].username===user.username){
        return;
    }
  }
  activeUsers.push(user);
  localStorage.setItem("activeUsers",JSON.stringify(activeUsers));
}


export const switchUser = (userName) => {
  // actualUser=user;
  activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
  for (let i=0; i<activeUsers.length; i++){
    if(activeUsers[i].username===userName){
      actualUser=activeUsers[i];
      goTo("/files");
      return;
    }
  }
  goTo("/login");
};
// function getUsers(){
//     activeUsers = localStorage.getItem("activeUsers");
//     return activeUsers;
// }


export const getActiveUsers = () => {
  activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
  return activeUsers;
};

export const getActualUser = () => {
    return actualUser;
  };

export const logOut = (userName) => {
  activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
    for (let i=0; i<activeUsers.length; i++){
        if(activeUsers[i].username===userName){
            activeUsers.splice(i,1);
            localStorage.setItem("activeUsers",JSON.stringify(activeUsers));
            break;
        }
    }
    if (actualUser != null){
      if (actualUser.username == userName){
        actualUser = null;
        goTo("/login");
      }
    }
  };



