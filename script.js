let form = document.querySelector('#input-form');
let input = document.querySelector('#text-input');
let list = document.querySelector('#list');
let allButton = document.querySelector('.all-button');
let activeButton = document.querySelector('.active-button');
let completedButton = document.querySelector('.completed-button');
let actContainer = document.querySelector('#action-container');
let numberOfItems = document.querySelector('#number-of-items');
let toggleAllButton = document.querySelector('#toggle-all');
let clearCompleted = document.querySelector('.clear-completed');

let tasks = [];

function countRemainingTasks() {
  let remainingTasks = tasks.filter(task => !task.completed);
  numberOfItems.textContent = remainingTasks.length;

  if (tasks.length === 0) {
    actContainer.style.display = 'none';
    clearCompleted.style.display = 'none';
  } else {
    actContainer.style.display = 'inline-block';

    let completedTasks = tasks.filter(task => task.completed);
    if (completedTasks.length > 0) {
      clearCompleted.style.display = 'inline-block';
    } else {
      clearCompleted.style.display = 'none';
    }
  }
}




//Enter checks all tasks fix
input.onkeydown = function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    actContainer.style.display = 'block';
    let newTask = {
      text: input.value,
      completed: false
    };
    tasks.push(newTask);
    createListItem(newTask);
    countRemainingTasks();
    input.value = '';
  }
};


allButton.addEventListener('click', function (event) {
  updateList();
});

activeButton.addEventListener('click', function (event) {
  updateList(false);
});

completedButton.addEventListener('click', function (event) {
  updateList(true);
});

toggleAllButton.addEventListener('click', function (event) {
  toggleAll();
});

clearCompleted.addEventListener('click', function (event) {
  tasks = tasks.filter(task => !task.completed);
  updateList();
  countRemainingTasks();
});

function createListItem(task) {
  let item = document.createElement('li');
  let label = document.createElement('label');
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', function (event) {
    task.completed = checkbox.checked;
    countRemainingTasks();
  });
  let deleteButton = document.createElement('button');
  deleteButton.className = 'delete-mark';
  deleteButton.addEventListener('click', function (event) {
    deleteTask(task);
    countRemainingTasks();
    updateList();
  });
  label.append(task.text);
  item.append(checkbox, label, deleteButton);
  list.append(item);
}

function updateList(showCompleted = null) {
  list.innerHTML = '';
  let filteredTasks = tasks;
  if (showCompleted !== null) {
    filteredTasks = tasks.filter(function (task) {
      return task.completed === showCompleted;
    });
  }
  filteredTasks.forEach(function (task) {
    createListItem(task);
  });
}

function deleteTask(task) {
  tasks.splice(tasks.indexOf(task), 1);
}

function toggleAll() {
  let count = 0;
  for (let task of tasks) {
    if (task.completed) {
      count++;
    }
  }
  if (count === tasks.length) {
    for (let task of tasks) {
      task.completed = false;
    }
  } else {
    for (let task of tasks) {
      task.completed = true;
    }
  }
  updateList();
  countRemainingTasks();
}