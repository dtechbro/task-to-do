// Function to add a new task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText === "") return;
  
    var task = {
      text: taskText,
      done: false,
      deadline: new Date() // Set current time as default deadline
    };
  
    // Store task data as a cookie
    document.cookie = "task_" + Date.now() + "=" + JSON.stringify(task) + ";";
  
    taskInput.value = ""; // Clear input field
    displayTasks(); // Refresh task list
}
  
// Function to display tasks
function displayTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks
  
    var cookies = document.cookie.split(";").map(cookie => cookie.trim());
    cookies.forEach(cookie => {
        var [name, value] = cookie.split("=");
        if (name.startsWith("task_")) {
            var task = JSON.parse(value);
            var taskItem = document.createElement("li");
            taskItem.className = "task" + (task.done ? " done" : "");
    
            var deadlineTime = new Date(task.deadline).getTime();
            var currentTime = new Date().getTime();
            var timeDifference = deadlineTime - currentTime;
            if (timeDifference <= 0) {
            taskItem.innerText = task.text + " (Deadline reached!)";
            } else {
            taskItem.innerText = task.text + " (Deadline: " + new Date(timeDifference).toISOString().substr(11, 8) + ")";
            }
    
            taskItem.onclick = function() {
            task.done = !task.done;
            document.cookie = name + "=" + JSON.stringify(task) + ";";
            displayTasks();
            };
  
            taskList.appendChild(taskItem);
        }
    });
}
  
// Display tasks on page load
window.onload = function() {
    displayTasks();
};  