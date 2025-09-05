function validateInput(input) {
  const trimmedInput = input.trim();
  return trimmedInput.length > 0;
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.className = "task-item flex justify-between items-center p-3 border-b";
  li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-actions">
            <button class="complete-button bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">Complete</button>
            <button class="delete-button bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
        </div>
    `;
  return li;
}

document

  .getElementById("add-task-button")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Tambahkan ini agar form tidak reload
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value;
    if (validateInput(taskText)) {
      const taskList = document.getElementById("task-list");
      const newTask = createTaskElement(taskText);
      taskList.appendChild(newTask);
      taskInput.value = "";
    } else {
      alert("Please enter a valid task.");
    }
  });
document
  .getElementById("task-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("complete-button")) {
      const taskItem = event.target.closest(".task-item");
      taskItem.querySelector(".task-text").classList.toggle("line-through");
    }
    if (event.target.classList.contains("delete-button")) {
      const taskItem = event.target.closest(".task-item");
      taskItem.remove();
    }
  });
document
  .getElementById("delete-completed-button")
  .addEventListener("click", function () {
    const taskList = document.getElementById("task-list");
    const completedTasks = taskList.querySelectorAll(".task-text.line-through");
    completedTasks.forEach((task) => task.closest(".task-item").remove());
  });

// Optional: Add functionality to clear all tasks
document
  .getElementById("clear-all-button")
  .addEventListener("click", function () {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
  });

// Optional: Add functionality to filter tasks (all, completed, pending)
document
  .getElementById("filter-tasks")
  .addEventListener("change", function (event) {
    const filter = event.target.value;
    const taskItems = document.querySelectorAll(".task-item");

    taskItems.forEach((item) => {
      const isCompleted = item
        .querySelector(".task-text")
        .classList.contains("line-through");
      if (
        filter === "all" ||
        (filter === "completed" && isCompleted) ||
        (filter === "pending" && !isCompleted)
      ) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

// Optional: Add functionality to edit tasks
document
  .getElementById("task-list")
  .addEventListener("dblclick", function (event) {
    if (event.target.classList.contains("task-text")) {
      const taskTextElement = event.target;
      const currentText = taskTextElement.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.className = "edit-input border p-1";
      taskTextElement.replaceWith(input);
      input.focus();
      input.addEventListener("blur", function () {
        const newText = input.value.trim();
        if (newText) {
          taskTextElement.textContent = newText;
        }
        input.replaceWith(taskTextElement);
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          input.blur();
        }
      });
    }
  });
