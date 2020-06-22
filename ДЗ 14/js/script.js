'use strict';

const CLASS_TODO_ITEM = 'todo-item';
const CLASS_TODO_ITEM_DONE = 'is-done';
const CLASS_DEL_BUTTON = 'del-btn';
const inputTask = document.querySelector('#inputTask');
const addTaskForm = document.querySelector('#addTaskForm');

const taskList = document.querySelector('#taskList');
const taskTemplate = document.querySelector('#taskTemplate').innerHTML;

addTaskForm.addEventListener('submit', onSubmitAddTask);
taskList.addEventListener('click', onClickListItem);

// homework 14 starts here

fetch('https://jsonplaceholder.typicode.com/todos')
   .then(response => {
      return response.json();
   })
   .then(listFromServer => {
      listFromServer.forEach(el => {
         const task = {
            text: el.title,
            done: el.completed,
         };
         addTask(task);
      });
   });

function onSubmitAddTask(event) {
   event.preventDefault();
   processInput();
}

function processInput() {
   const task = {
      text: inputTask.value,
      done: false
   };

   if (checkValue(task.text)) {
      addTask(task);
   }

   setFocusOnInput();
}

function checkValue(value) {
   return value != '';
}

function addTask(task) {
   const taskItemHtml = taskTemplate.replace('{{text}}', task.text);
   const taskItemElement = htmlToElement(taskItemHtml);

   if (task.done) {
      taskItemElement.classList.add(CLASS_TODO_ITEM_DONE);
   }

   taskList.appendChild(taskItemElement);
}

function htmlToElement(html) {
   const template = document.createElement('template');
   html = html.trim();
   template.innerHTML = html;
   return template.content.firstChild;
}

function setFocusOnInput() {
   inputTask.value = '';
   inputTask.focus();
}

function onClickListItem(event) {
   const itemClass = event.target.classList;

   if (itemClass.contains(CLASS_DEL_BUTTON)) {
      removeItem(event.target.parentNode);
   } else
   if (itemClass.contains(CLASS_TODO_ITEM)) {
      toggleItem(itemClass);
   }
}

function removeItem(element) {
   element.remove();
}

function toggleItem(elementClass) {
   elementClass.toggle(CLASS_TODO_ITEM_DONE);
}