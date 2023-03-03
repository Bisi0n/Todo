
let form = document.querySelector('form')
let input = document.querySelector('#text-input');
let list = document.querySelector('#list');
let allButton = document.querySelector('.all-button');
let activeButton = document.querySelector('.completed-button');
let submitButton = document.querySelector('#submit-button')
let actContainer = document.querySelector('#action-container')

let tasks= [];


input.addEventListener('keydown', function(event) {


    //keyCode 13 refers to the "Enter" key on keyboard.
    if(event.keyCode === 13 && input.value != "" && input.value != null){

        //Prevent the default value of the event.
        event.preventDefault();

        let newTask = {
            text: input.value,
            completed: false
        };
    
        tasks.push(newTask);

        createListItem(newTask);
        showItems(actContainer);

    }
})



function createListItem(Task) {

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

  
  label.append(checkbox, Task.text , deleteButton)
  item.append(label)
  list.append(item);

  input.value = "";
}

function showItems(element){

    element.style.display= 'block';
}

