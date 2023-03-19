"use strict";
const btnSubmit = document.querySelector(".todo-submit") as HTMLButtonElement;
const inputTodo = document.querySelector(".todo-input") as HTMLInputElement;
const formTodo = document.querySelector(".todo-form") as HTMLFormElement;
const todoList = document.querySelector(".todo-list") as HTMLLIElement;
const delBtn = document.querySelector(".delete-all") as HTMLButtonElement;

//submit handler

const submitHandler = (e: Event) =>{
    e.preventDefault();
    

    const newTodo={
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };

    //save to local storage
    todos.push(newTodo);

    saveTodos();

    

    //append new todo fn
appendTodo(newTodo);
    
}

//input reset

inputTodo.value="";

//save todo

const saveTodos= () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//new todos array

const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')
console.log(todos);

window.addEventListener("DOMContentLoaded", ()=>{
    todos.forEach(todo => appendTodo(todo));
});

//new todo interface
interface Todo {
    id: number,
    todo: string,
    completed: boolean
}

const appendTodo= (newTodo: Todo) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement('input');
    checkB.type="checkbox";

    checkB.addEventListener("change", ()=>{
        console.log("checked");
        checkB.checked= newTodo.completed;
        newTodo.completed = checkB.checked;
        saveTodos();
    })
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
}

//form event listener
formTodo.addEventListener("submit", e => submitHandler(e));

//delete all

const clearTodos=()=>{
    todos.length=0;
    saveTodos();
    todoList.innerHTML="";
}

delBtn.onclick=()=>clearTodos()