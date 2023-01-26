let form = document.querySelector("#form");
let textInput = document.querySelector('input[name="ntTittleInput"');
let startTimeInput = document.querySelector('input[name="ntStartTimeInput"');
let endTimeInput = document.querySelector('input[name="ntEndTimeInput"');
let locationInput = document.querySelector('input[name="ntLocationInput"');
let textarea = document.querySelector("#ntTextArea");
let msgDate = document.querySelector("#ntMsgDate");
let msgLocation = document.querySelector("#ntLocation");
let taskList = document.querySelector("#tasks");
let add = document.querySelector("#ntAdd");
let searchInput = document.querySelector("[data-search]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  data.forEach((d, ind) => {
    const isVisible = d.tittle.toLowerCase().includes(value) ||
      d.description.toLowerCase().includes(value) ||
      d.startTime.toLowerCase().includes(value) ||
      d.endTime.toLowerCase().includes(value) ||
      d.location.toLowerCase().includes(value);
    console.log(document.getElementsByName(ind));
    const searchedElement = document.getElementsByName(ind);
    searchedElement.forEach(x => x.classList.toggle("hide", !isVisible));
    //searchedElement.classList.toggle("hide", !isVisible);
  })
});

let formValidation = () => {
  if (startTimeInput.value > endTimeInput.value) {
    console.log("failure");
    msgDate.innerHTML = "Datum nelze nastavit.";
  }
  else {
    if (locationInput.value === "") {
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=cze`;

        fetch(geoApiUrl)
          .then(res => res.json())
          .then(data => {
            locationInput.value = data.locality;
            console.log("success");
            acceptData();
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();
          });
      };
      const error = () => {
        msgLocation.innerHTML = "Polohové údaje nejsou dostupné."
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }
    else {
      console.log("success");
      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();

      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    tittle: textInput.value,
    startTime: startTimeInput.value,
    endTime: endTimeInput.value,
    description: textarea.value,
    location: locationInput.value,
  });


  while (taskList.lastElementChild) {
    taskList.removeChild(taskList.lastElementChild);
  };

  createTaskCards();
  localStorage.setItem("data", JSON.stringify(data));
};

let createTaskCards = () => {
  const todoItems = [];

  data.forEach((task, index) => {
    const element = document.createElement('div');
    element.setAttribute("name", index)

    const elementTittle = document.createElement('span');
    elementTittle.classList.add('fw-bold');
    elementTittle.innerText = task.tittle;

    const elementDates = document.createElement('span');
    elementDates.classList.add('text-secondary');
    elementDates.innerText = "Od: " + task.startTime + " Do: " + task.endTime;

    const elementLocation = document.createElement('span');
    elementLocation.classList.add('text-secondary');
    elementLocation.innerText = "Místo: " + task.location;

    const elementDescription = document.createElement('p');
    elementDescription.classList.add('text-secondary');
    elementDescription.innerText = task.description;

    const elementOption = document.createElement('div');

    element.appendChild(elementTittle);
    element.appendChild(elementDates);
    element.appendChild(elementLocation);
    element.appendChild(elementDescription);
    element.appendChild(elementOption);

    elementOption.classList.add('options');
    const elementEdit = document.createElement('i');
    elementEdit.classList.add('fas');
    elementEdit.classList.add('fa-edit');
    elementEdit.setAttribute('data-bs-toggle', 'modal');
    elementEdit.setAttribute('data-bs-target', '#form');
    elementEdit.addEventListener('click', () => {
      data.splice(index, 1);
      editTaskForm(task);
    });

    elementOption.appendChild(elementEdit);

    const elementDelete = document.createElement('i');
    elementDelete.classList.add('fas');
    elementDelete.classList.add('fa-trash-alt');
    elementDelete.addEventListener('click', () => {
      deleteTask(element, index);
    });

    elementOption.appendChild(elementDelete);

    todoItems.push(element);
  });
  taskList.append(...todoItems);
  resetForm();
};

let deleteTask = (element, index) => {
  element.remove();
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTaskForm = (task) => {
  console.log(data)

  textInput.value = task.tittle;
  textarea.value = task.description;
  startTimeInput.value = task.startTime;
  endTimeInput.value = task.endTime;
  locationInput.value = task.location;
};

let resetForm = () => {
  textInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  textarea.value = "";
  locationInput.value = "";
};

(() => {
  if (localStorage.getItem("data") != null){
    data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTaskCards();}
  else{
    localStorage.setItem(data);
  }
})();
