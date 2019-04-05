//functions to run when create new task button is clicked. also when save button click, function will clear dom and popluate all task, including new one. new task handler, refresh handler, save new task handler, edit existing task
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

let data = sessionStorage.getItem("userID")

export default {
    //function runs when enter new task button is clicked. clears two buttons and creates a input field, with a save button
    handleNewTask() {
        let container = document.querySelector("#loopDiv")
        container.appendChild(taskForm.newTaskForm())

        let buttonContainer = document.querySelector("#buttonDiv")
        htmlFactory.clearContainer(buttonContainer)
    },
    //fucntion runs when save button is clicked. takes the values and post them to json file. then clears dom and does get request and posts updated data to dom
    handleSaveTask() {
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

    },
    //function runs when user clicks the task name or date. will clear dom, place a input field, populate field with current data
    handleEditTask(event) {
        apiManager.getTask(data)
            .then(response => {
                let divContainer = event.target.parentNode
                console.log(divContainer)
                htmlFactory.clearContainer(divContainer)
                
                let editInput = htmlFactory.createElementWithText("input")
                editInput.size = "45"
                
                editInput.addEventListener("keyup", (event) => {
                    if (event.keyCode === 13) {
                        console.log("yo")
                    }
                })
                
                response.forEach(entry => {
                    console.log(entry)
                    editInput.value = event.target.textContent
                    divContainer.appendChild(editInput)
                })

            })
    }
}

// clearContainer(elementToClear) {
//     while (elementToClear.firstChild) {
//         elementToClear.removeChild(elementToClear.firstChild);
//     }
// }

// "id": 7,
// "userId": 1,
// "taskName": "kill the lawn",
// "targetDate": "4/1/2019",
// "isComplete": true