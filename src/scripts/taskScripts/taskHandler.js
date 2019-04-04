//functions to run when create new task button is clicked. also when save button click, function will clear dom and popluate all task, including new one. new task handler, refresh handler, save new task handler
import taskForm from "./taskForm"
//newTaskForm
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer
import apiManager from "../apiManager"
//getTask
//postTask
import task from "./task"
//createTask

export default {
    handleNewTask () {
        let container = document.querySelector("#loopDiv")
        container.appendChild(taskForm.newTaskForm())

        let buttonContainer = document.querySelector("#buttonDiv")
        htmlFactory.clearContainer(buttonContainer)
    },
    handleSaveTask () {
        let taskDateValue = document.querySelector("#dateInput").value
        let taskValue = document.querySelector("#taskInput").value
        let data = sessionStorage.getItem("userID")

        let postObject = {
            userId: Number(data),
            taskName: taskValue,
            targetDate: taskDateValue,
            isComplete: false
        }
        apiManager.postTask(postObject)
        .then(r => {
            let container = document.querySelector("#tasks-section")
            htmlFactory.clearContainer(container)
            container.appendChild(task.createTask())
        })
        
    }
}

// "id": 7,
// "userId": 1,
// "taskName": "kill the lawn",
// "targetDate": "4/1/2019",
// "isComplete": true