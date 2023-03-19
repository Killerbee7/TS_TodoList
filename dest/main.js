"use strict";
const btnSubmit = document.querySelector(".todo-submit");
const inputTodo = document.querySelector(".todo-input");
const formTodo = document.querySelector(".todo-form");
const todoList = document.querySelector(".todo-list");
const delBtn = document.querySelector(".delete-all");
//submit handler
const submitHandler = (e) => {
    e.preventDefault();
    const newTodo = {
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };
    //save to local storage
    todos.push(newTodo);
    saveTodos();
    //append new todo fn
    appendTodo(newTodo);
};
//input reset
inputTodo.value = "";
//save todo
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
//new todos array
const todos = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach(todo => appendTodo(todo));
});
const appendTodo = (newTodo) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement('input');
    checkB.type = "checkbox";
    checkB.checked = newTodo.completed;
    checkB.onchange = () => {
        console.log("checked");
        newTodo.completed = checkB.checked;
        saveTodos();
    };
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
};
//form event listener
formTodo.addEventListener("submit", e => submitHandler(e));
//delete all
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = "";
};
delBtn.onclick = () => clearTodos();
