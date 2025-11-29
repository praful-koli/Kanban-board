const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
const taskColums = document.querySelectorAll(".task-colums");
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskButton = document.querySelector(".add-task-btn");
let dragElement = null;

tasks.forEach((task, idx) => {
  task.addEventListener("dragstart", (evt) => {
    dragElement = task;
    console.log(task)
  });
});

function addDragEventsOnColumn(column) {
  // console.log(column)
  column.addEventListener("dragenter", (evt) => {
    evt.preventDefault();
    column.classList.add("hover-over");
  });

  column.addEventListener("dragleave", (evt) => {
    evt.preventDefault();
    column.classList.remove("hover-over");
  });

  column.addEventListener("dragover", (evt) => {
    evt.preventDefault();
  });

  column.addEventListener("drop", (evt) => {
    evt.preventDefault();
    column.appendChild(dragElement)
    column.classList.remove("hover-over");
  });
}

taskColums.forEach((taskCol) => {
  const el = document.getElementById(taskCol.id);
  if (el) addDragEventsOnColumn(el);
});

// modal logic
toggleModalButton.addEventListener("click", (evt) => {
  modal.classList.toggle("active");
});
modalBg.addEventListener("click", (evt) => {
  modal.classList.toggle("active");
});

addTaskButton.addEventListener("click", (evt) => {
  const taskTitel = document.querySelector("#new-task-title").value;
  const taskDec = document.querySelector("#new-decription-title").value;
  const prevTask = document.querySelector('.task');
  
  const div = document.createElement('div');

   
  div.setAttribute('draggable',true);
  div.classList.add('task');


  div.innerHTML = `
               <h2>${taskTitel}</h2>
               <p>${taskDec}</p>
               <button>Delete</button>
               `;

    todo.appendChild(div)
    console.log(div);
    
    modal.classList.toggle("active");

    div.addEventListener("dragstart", (evt) => {
    dragElement = div;
  });
});


