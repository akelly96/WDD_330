let selected;
let section = "";
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
        load(section, false);
    }
    task.value = "";
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
}
function loadActiveTasks(){
    let activeHeader = document.createElement("div");
    activeHeader.innerHTML = "<h5 class='sectionHeader'>ACTIVE TASKS<h5><hr>"
    document.getElementById("list").appendChild(activeHeader);
    if (activeTasks.length > 0) {
        for (activeTask of activeTasks){
            var newTask = document.createElement('div');
            newTask.className = "tasks";
            newTask.innerHTML = "<div class=checkbox onclick='checkBox(event)'>" +
                                    "</div><p class='task'>" + 
                                    activeTask + 
                                    "</p><div class='deleteButton' onclick='deleteTask()'></div>";
            document.getElementById("list").appendChild(newTask);
        }
    } else {
        let none = document.createElement("div");
        none.innerHTML = "<p class='none'>No Active Tasks</p>"
        document.getElementById("list").appendChild(none)
    }
}
function loadCompleteTasks() {
    let completeHeader = document.createElement("div");
    completeHeader.innerHTML = "<h5 class='sectionHeader'>COMPLETED TASKS</h5><hr>"
    document.getElementById("list").appendChild(completeHeader);
    if (completeTasks.length > 0){
        for (completeTask of completeTasks){
            var newTask = document.createElement('div');
            newTask.className = "tasks";
            newTask.innerHTML = "<div class=checkbox onclick='checkBox()'>" +
                                    "<p class='x'>&times;</p></div><p class='task'" +
                                    " style='text-decoration:line-through'>" + 
                                    completeTask + 
                                    "</p><div class='deleteButton' onclick='deleteTask()'></div>";
            document.getElementById("list").appendChild(newTask);
        }
    } else {
        let none = document.createElement("div");
        none.innerHTML = "<p class='none'>No Completed Tasks</p>"
        document.getElementById("list").appendChild(none)
    }
}

function checkBox() {
    if (event.target.nodeName === "P"){
        let index = completeTasks.indexOf(event.target.parentElement.parentElement.querySelector(".task").innerHTML);
        event.target.parentElement.innerHTML = ""
        activeTasks.push(completeTasks[index]);
        completeTasks.splice(index, 1);
    } else {
        let index = activeTasks.indexOf(event.target.parentElement.querySelector(".task").innerHTML);
        event.target.innerHTML = "<p class='x'>&times;</p>"
        completeTasks.push(activeTasks[index]);
        activeTasks.splice(index, 1);
    }
    localStorage.setItem("activeTasks", JSON.stringify(activeTasks));
    localStorage.setItem("completeTasks", JSON.stringify(completeTasks));
    load(section, false);
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
    load(section, false);
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
    section = "all";
    setFocus();
}
function load(sections, isFilterButton) {
    document.getElementById("list").innerHTML = 
    "<div id='listHeader'><h3>To Do List</h3><h5>Remaining Tasks: " +
    activeTasks.length +"</h5></div><hr>";
    section = sections
    if (sections === "all"){
        loadActiveTasks();
        document.getElementById("list").appendChild(document.createElement("hr"));
        loadCompleteTasks();
    } else if (sections === "active") {
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