let editingTaskIndex = -1;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    
    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    
    li.textContent = taskInput.value;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = function() {
        editTask(li);
    };

    const closeButton = document.createElement("span");
    closeButton.textContent = "❌";
    closeButton.className = "close";
    
    closeButton.onclick = function() {
        deleteTask(li);
    };

    li.appendChild(editButton);
    li.appendChild(closeButton);
    
    li.onclick = function() {
        toggleTaskCompletion(li);
    };

    document.getElementById("taskList").appendChild(li);
    
    taskInput.value = ""; // Clear input field
}

function toggleTaskCompletion(li) {
    li.classList.toggle("checked");
    if (li.classList.contains("checked")) {
        li.textContent = li.textContent.replace(" (pending)", " (completed)");
    } else {
        li.textContent = li.textContent.replace(" (completed)", " (pending)");
    }
}

function editTask(li) {
    const editModal = document.getElementById("editModal");
    const editInput = document.getElementById("editInput");
    
    editingTaskIndex = Array.from(li.parentNode.children).indexOf(li);
    editInput.value = li.textContent.replace(" (pending)", "").replace(" (completed)", "");
    
    editModal.style.display = "block";
}

function updateTask() {
    const editInput = document.getElementById("editInput");
    const taskList = document.getElementById("taskList");
    const editModal = document.getElementById("editModal");
    
    if (editingTaskIndex !== -1) {
        const taskItem = taskList.children[editingTaskIndex];
        const isCompleted = taskItem.classList.contains("checked");
        
        taskItem.textContent = editInput.value + (isCompleted ? " (completed)" : " (pending)");
        
        editingTaskIndex = -1;
        editModal.style.display = "none";
    }
}

function deleteTask(li) {
    li.remove();
}

function filterTasks(filter) {
    const taskList = document.getElementById("taskList");
    const taskItems = taskList.children;
    
    for (let i = 0; i < taskItems.length; i++) {
        const taskItem = taskItems[i];
        
        if (filter === 'all') {
            taskItem.style.display = 'flex';
        } else if (filter === 'pending') {
            taskItem.style.display = taskItem.classList.contains('checked') ? 'none' : 'flex';
        } else if (filter === 'completed') {
            taskItem.style.display = taskItem.classList.contains('checked') ? 'flex' : 'none';
        }
    }
}