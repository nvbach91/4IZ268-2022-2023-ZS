const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//Functions
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add to storage
    saveLocalTodos(todoInput.value);
    //completed btn
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete btn
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append
    todoList.appendChild(todoDiv);
    //clear input
    todoInput.value = '';
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //completed btn
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //delete btn
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    } 
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


//sidebar date and time
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}

setInterval(() => {
  const now = new Date();

  timeElement.textContent = formatTime(now);
  dateElement.textContent = formatDate(now);
}, 200);

//quote api
let quote = document.getElementById("quote");
let author = document.getElementById("author");
let btn = document.getElementById("btn");
const url = "https://api.quotable.io/random";
let getQuote = () => {
  fetch(url)
    .then((data) => data.json())
    .then((item) => {
      quote.innerText = item.content;
      author.innerText = item.author;
    });
};
window.addEventListener("load", getQuote);
btn.addEventListener("click", getQuote);