let selected;
let sectionToLoad = "";
let activeTasks = [];
let completeTasks = [];
if (localStorage.getItem("activeTasks")){
    activeTasks = JSON.parse(localStorage.getItem("activeTasks"));
}
if (localStorage.getItem("completeTasks")){
    completeTasks = JSON.parse(localStorage.getItem("completeTasks"));
}
function addTask() {
    let task = document.getElementById("taskInput");
    if (task.value != ""){
        activeTasks.push(task.value.replace(/\s+/g,' ').trim());
        load(sectionToLoad, false);
    }
    task.value = "";
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
}
function loadActiveTasks(){
    let activeSection = document.createElement("div");
    activeSection.id = "activeClass";
    activeSection.innerHTML = `<h5 class="sectionHeader">ACTIVE TASKS<h5><hr>`
    if (activeTasks.length > 0) {
        for (activeTask of activeTasks){
            activeSection.innerHTML += `
            <div class="tasks">
                <div class=activeCheckbox onclick="checkBox(event)"></div>
                <p class="task">${activeTask}</p>
                <div class="deleteButton" onclick="deleteTask()"></div>
            </div>`;
        }
    } else {
        activeSection.innerHTML += `<p class="none">No Active Tasks</p>`;
    }
    document.getElementById("list").appendChild(activeSection)
}
function loadCompleteTasks() {
    let completeSection = document.createElement("div");
    completeSection.id = "completeClass";
    completeSection.innerHTML = "<h5 class='sectionHeader'>COMPLETED TASKS</h5><hr>"
    document.getElementById("list").appendChild(completeSection);
    if (completeTasks.length > 0){
        for (completeTask of completeTasks){
            completeSection.innerHTML += `
            <div class="tasks">
                <div class=completeCheckbox onclick="checkBox()"></div>
                <p class="task" style="text-decoration:line-through">${completeTask}</p>
                <div class="deleteButton" onclick="deleteTask()"></div>
            </div>`;
        }
    } else {
        completeSection.innerHTML += `<p class="none">No Completed Tasks</p>`;
    }
    document.getElementById("list").appendChild(completeSection);
}

function checkBox() {
    console.log(event.target.parentElement.parentElement);
    let section = event.target.parentElement.parentElement;
    console.log(section.id);
    if (section.id == "activeClass") {
        let index = activeTasks.indexOf(event.target.parentElement.querySelector(".task").innerHTML);
        completeTasks.push(activeTasks[index]);
        activeTasks.splice(index, 1);
    } else {
        let index = completeTasks.indexOf(event.target.parentElement.querySelector(".task").innerHTML);
        activeTasks.push(completeTasks[index]);
        completeTasks.splice(index, 1);
    }
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
    load(sectionToLoad, false);
}

function deleteTask() {
    let index = activeTasks.indexOf(event.target.parentElement.querySelector(".task").innerHTML);
    if (index == -1){
        index = completeTasks.indexOf(event.target.parentElement.querySelector(".task").innerHTML);
        completeTasks.splice(index, 1);
    } else {
        activeTasks.splice(index, 1);
    }
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
    load(sectionToLoad, false);
}

function setFocus() {
    document.getElementById('taskInput').focus();
}

function initialLoad() {
    document.getElementById("taskInput").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("addTaskButton").click();
        }
    });
    load("all", true);
    sectionToLoad = "all";
}
function load(sections, isFilterButton) {
    document.getElementById("list").innerHTML = 
    `<div id='listHeader'>
        <h3>To Do List</h3>
        <h5>Remaining Tasks: ${activeTasks.length}</h5>
    </div>
    <hr>`;
    sectionToLoad = sections
    if (sectionToLoad === "all"){
        loadActiveTasks();
        document.getElementById("list").appendChild(document.createElement("hr"));
        loadCompleteTasks();
    } else if (sectionToLoad === "active") {
        loadActiveTasks();
    } else {
        loadCompleteTasks();
    }
    if (isFilterButton){
        if (event.target.nodeName == "P") {
            selected.style.backgroundColor = "";
            selected = event.target.parentElement;
            selected.style.backgroundColor = "#d2d2ff";
        } else if (event.target.nodeName == "DIV") {
            selected.style.backgroundColor = "";
            selected = event.target;
            selected.style.backgroundColor = "#d2d2ff";
        } else {
            selected = document.getElementById("left");
            selected.style.backgroundColor = "#d2d2ff";
        }
    }
}