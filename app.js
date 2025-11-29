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
let taskData = {};
 
function renderTaks() {
    if (localStorage.getItem('tasks')) {
    const data = JSON.parse(localStorage.getItem('tasks'));
    
    for(col in data) {
         const column = document.querySelector(`#${col}`)
        data[col].forEach( task => {
            console.log(`task  : ${task.title}`)
            createTask(task.title,task.desc, column);
        })
    }
}
}



renderTaks()

tasks.forEach((task, idx) => {
  task.addEventListener("dragstart", (evt) => {
    dragElement = task;
    
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
     saveAndCountTasks()
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
    
  //create task element
    createTask(taskTitel, taskDec, todo);
    //save task in localstorage and count task
    saveAndCountTasks();
     document.querySelector("#new-task-title").value = ''
     document.querySelector("#new-decription-title").value = ''
    modal.classList.toggle("active");   
});

//save & count logic
 function saveAndCountTasks() {
    taskColums.forEach((col, idx)=> {
        const tasks = col.querySelectorAll('.task');
        let count = col.querySelector('.heading .right')
       

        taskData[col.id] = [...tasks].map( t =>
         {
             return {
                title : t.querySelector('h2').innerText,
                desc : t.querySelector('p').innerText,
             }
        })

         localStorage.setItem('tasks',JSON.stringify(taskData));

         count.textContent = `Count : ${tasks.length}`;
    })
  }
  saveAndCountTasks()


//  createing task element ;

function createTask(title, desc , column) {
  const div = document.createElement('div'); 
  div.setAttribute('draggable',true);
  div.classList.add('task');


  div.innerHTML = `
               <h2>${title}</h2>
               <p>${desc}</p>
               <button class="task-delete-btn">Delete</button>
               `;
   
    column.appendChild(div);

     // Drag logic
    div.addEventListener("dragstart", (evt) => {
       dragElement = div;
    });

    //Delete button logic
      const deleteBtn = div.querySelector('.task-delete-btn');
      deleteBtn.addEventListener('click', (evt)=> {
        if (confirm("Are you sure you want to delete this task?")) {
              div.remove();
              saveAndCountTasks();
        }
      })

    return div;
}


  