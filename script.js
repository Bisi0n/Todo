let form = document.querySelector('form')
let input = document.querySelector('#text-input');
let list = document.querySelector('#list');
let allButton = document.querySelector('.all-button');
let activeButton = document.querySelector('.completed-button');
let submitButton = document.querySelector('#submit-button')
let actContainer = document.querySelector('#action-container')
let numberOfItems = document.querySelector('#number-of-items')

let tasks = [];


  input.addEventListener('keydown', function(event) {
    

    // keyCode 13 refers to the "Enter" key on keyboard.
    if (event.keyCode === 13 && !input.textContent) {

      event.preventDefault();
      actContainer.style.display = 'block';

      
      let newTask = {
        text: input.value,
        completed: false
      };

      tasks.push(newTask);

      createListItem(newTask);

      numberOfItems.value = countRemainingTasks();
    }
  });


function createListItem(Task) {

  if (!Task || !Task.text) {
    return;
  }

  let item = document.createElement('li')
  let label = document.createElement('label')

  let checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.addEventListener('change', e => {
    Task.completed = checkbox.checked
  })
  checkbox.checked = Task.completed

  let deleteButton = document.createElement('button')
  deleteButton.type = 'button'
  deleteButton.style.height = '15px'
  deleteButton.textContent = 'X'

  label.append(checkbox, Task.text, deleteButton)
  item.append(label)
  list.append(item);

  input.value = "";
}

function countRemainingTasks() {

  let remainingTasks = tasks.filter(task => task.completed === false)

  return remainingTasks.length
}

function deletedItems(){

}
