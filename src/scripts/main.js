import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"
import task from "./taskScripts/task"

const container = document.querySelector("#login-section")

container.appendChild(loginForm.createLoginForm())


// let data = sessionStorage.getItem("string")
// console.log(data)
let taskContainer = document.querySelector("#tasks-section")
taskContainer.appendChild(task.createTask())

// task.createTask()