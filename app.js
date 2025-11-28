const todo = document.querySelector('#todo');
const progress = document.querySelector('#progress');
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
const taskColums =  document.querySelectorAll('.task-colums');

let dragElement = null;
tasks.forEach((task , idx) => {
    task.addEventListener('dragstart', (evt) => {
        dragElement = task;
    })
})

function addDragEventsOnColumn(column) {
    // console.log(column)
    column.addEventListener('dragenter' , (evt)=> {
       evt.preventDefault();
        column.classList.add('hover-over');
    })

    column.addEventListener('dragleave', (evt)=> {
        evt.preventDefault();
        column.classList.remove('hover-over');
    } )
 
    column.addEventListener('dragover' ,(evt) => {
        evt.preventDefault();
    }) 

    column.addEventListener('drop' , (evt) => {
        evt.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove('hover-over')
    })
}

taskColums.forEach((taskCol) => {
   const el = document.getElementById(taskCol.id);
    if (el) addDragEventsOnColumn(el);
})


