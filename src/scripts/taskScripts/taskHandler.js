//functions to run when create new task button is clicked. also when save button click, function will clear dom and popluate all task, including new one. new task handler, refresh handler, save new task handler, edit existing task
import taskForm from "./taskForm"
//newTaskForm
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer
import taskApiManager from "./taskApiManager"
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
        taskApiManager.postTask(postObject)
            .then(r => {
                let container = document.querySelector("#tasks-section")
                htmlFactory.clearContainer(container)
                container.appendChild(task.createTask())
            })

    },
    //function runs when user clicks the task name or date. will clear dom, place a input field, populate field with current data
    handleEditTask(event) {
        let divContainer = event.target.parentNode
        // console.log(divContainer)
        htmlFactory.clearContainer(divContainer)

        let divId = divContainer.id.split("--")

        taskApiManager.getOneTask(divId[1])
            .then(response => {
                let editInput = htmlFactory.createElementWithText("input", "", `editInput--${response.id}`)
                editInput.size = "45"
                editInput.value = response.taskName
                editInput.classList = "editInput"
                divContainer.appendChild(editInput)

                let dateInput = htmlFactory.createElementWithText("input", "", `dateInput--${response.id}`)
                dateInput.size = "45"
                dateInput.value = response.targetDate
                dateInput.classList = "dateInput"
                divContainer.appendChild(dateInput)

                editInput.addEventListener("keyup", (event) => {
                    if (event.keyCode === 13) {
                        this.handleSaveEdit()
                    }
                })

                dateInput.addEventListener("keyup", (event) => {
                    if (event.keyCode === 13) {
                        this.handleSaveEdit()
                    }
                })
            })
    },
    //function runs when you hit enter to save you edit changes, then repost all the tasks to the dom
    handleSaveEdit() {
        let divContainer = event.target.parentNode
        let divId = divContainer.id.split("--")
        let editInputValue = document.querySelector(`#editInput--${divId[1]}`).value
        let dateInputValue = document.querySelector(`#dateInput--${divId[1]}`).value

        let editObject = {
            userId: Number(data),
            taskName: editInputValue,
            targetDate: dateInputValue,
            isComplete: false
        }

        taskApiManager.putTask(divId[1], editObject)
            .then(r => {
                let container = document.querySelector("#tasks-section")
                htmlFactory.clearContainer(container)
                container.appendChild(task.createTask())
            })
    },
    handleCheckBox() {
        let divContainer = event.target.parentNode
        let divId = divContainer.id.split("--")
        console.log(divId)

        let patchObject = {
            isComplete: true
        }
        taskApiManager.patchTask(divId[1], patchObject)
        .then(r => {
            let container = document.querySelector("#tasks-section")
            htmlFactory.clearContainer(container)
            container.appendChild(task.createTask())
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