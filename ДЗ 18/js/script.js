'use strict';

const CLASS_TODO_ITEM = 'todo-item';
const CLASS_ITEM_DONE = 'is-done';
const CLASS_DEL_BUTTON = 'del-btn';
const STORAGE_KEY = 'todos';

const $inputTodo = $('#inputTodo');
const $addTodoForm = $('#addTodoForm');
const $todoList = $('#todoList');
const todoTemplate = $('#todoTemplate').html();

let todos = [];

$addTodoForm.on('submit', onSubmitAddTodo);
$todoList.on('click', onClickTodoList);

start();

function onSubmitAddTodo(event) {
   event.preventDefault();
   handleInput();
}

function onClickTodoList(event) {
   const $item = $(event.target);
   const itemId = $item.closest(`.${CLASS_TODO_ITEM}`).data('id');

   switch (true) {
      case $item.hasClass(CLASS_DEL_BUTTON):
         removeTodo(itemId);
         break;

      case $item.hasClass(CLASS_TODO_ITEM):
         toggleTodo(itemId);
         break;
   }
}

function start() {
   getListFromStorage();
   renderTodoList();
}

function getListFromStorage() {
   todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function renderTodoList() {
   const htmlTodoList = todos.map(makeTodoHtml).join('\n');

   $todoList.html(htmlTodoList);
}

function makeTodoHtml(todo) {
   const classList = (todo.done) ? `${CLASS_TODO_ITEM} ${CLASS_ITEM_DONE}` : CLASS_TODO_ITEM;

   return todoTemplate
      .replace('{{id}}', todo.id)
      .replace('{{todoText}}', todo.text)
      .replace('{{classTodoItem}}', classList);
}

function handleInput() {
   const inputValue = $inputTodo.val().trim();

   if (checkValue(inputValue)) {
      addTodo({
         id: Date.now(),
         text: inputValue,
         done: false
      });

      refreshInput();
   }
}

function checkValue(value) {
   return value != '';
}

function addTodo(todo) {
   todos.push(todo);
   putListToStorage();

   $todoList.append(makeTodoHtml(todo));
}

function putListToStorage() {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function refreshInput() {
   $inputTodo.val('');
   $inputTodo.focus();
}

function removeTodo(id) {
   const index = todos.findIndex(el => el.id == id);
   const todoElement = $todoList.find(`[data-id=${id}]`);

   if (index == -1) {
      return;
   }

   todos.splice(index, 1);
   putListToStorage();

   todoElement.remove();
}

function toggleTodo(id) {
   const todo = todos.find(el => el.id == id);
   const todoElement = $todoList.find(`[data-id=${id}]`);

   if (!todo) {
      return;
   }

   todo.done = !todo.done;
   putListToStorage();

   todoElement.toggleClass(CLASS_ITEM_DONE);
}