let form = document.getElementById("form");
let textInput = document.getElementById("ntTittleInput");
let startTimeInput = document.getElementById("ntStartTimeInput");
let endTimeInput = document.getElementById("ntEndTimeInput");
let locationInput = document.getElementById("ntLocationInput");
let textarea = document.getElementById("ntTextArea");
let msg = document.getElementById("ntMsg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("ntAdd");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    startTime: startTimeInput.value,
    endTime: endTimeInput.value,
    description: textarea.value,
    location: locationInput,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    console.log(y)
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">od:${x.startTime} do:${x.endTime}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  startTimeInput.value = selectedTask.children[1].innerHTML;
  endTimeInput.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  textarea.value = "";
  locationInput.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();
