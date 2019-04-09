//Author Alex Thacker

//function to create elements and do get call to populate elements
import taskApiManager from "./taskApiManager"
//getTask
//postTask
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer

import taskHandler from "./taskHandler"
//handleNewTask

// console.log(data)

export default {
    createTask() {
        //build elements 
        let data = sessionStorage.getItem("userID")
        let taskFragment = document.createDocumentFragment()
        let mainDiv = htmlFactory.createElementWithText("div")
        mainDiv.classList = "card"
        let taskHeader = htmlFactory.createElementWithText("h1", "Your Tasks")
        let headerDiv = htmlFactory.createElementWithText("div")
        headerDiv.classList = "card-header"
        let taskList = htmlFactory.createElementWithText("ul", "", "taskList")
        let loopDiv = htmlFactory.createElementWithText("div", "", "loopDiv")
        loopDiv.classList = "card-body"
        let buttonDiv = htmlFactory.createElementWithText("div", "", "buttonDiv")
        let newTaskButton = htmlFactory.createElementWithText("button", "New Task")
        newTaskButton.classList = "btn btn-primary"
        // let refreshButton = htmlFactory.createElementWithText("button", "Refresh")

        taskApiManager.getTask(data)
            .then(task => {
                task.forEach(entry => {
                    //build elements and add content inside them from get call. loops depending how many entries json file has
                    if (entry.isComplete === false) {
                        let innerDiv = htmlFactory.createElementWithText("div", "", `innerDiv--${entry.id}`)
                        innerDiv.classList = "innerDiv"
                        let taskListItem = htmlFactory.createElementWithText("li", `${entry.taskName}`)
                        taskListItem.classList = "taskListItem"
                        let dateSpan = htmlFactory.createElementWithText("p", `Target Date: ${entry.targetDate}`, `taskDate--${entry.id}`)
                        dateSpan.classList = "dateSpan"
                        let checkBox = htmlFactory.createElementWithText("input", "", `checkBox--${entry.id}`)
                        checkBox.type = "checkbox"
                        checkBox.value = entry.isComplete
                        checkBox.classList = "checkBox"
                        let checkBoxSpan = htmlFactory.createElementWithText("label", "Done ", `checkBoxSpan--${entry.id}`)
                        checkBoxSpan.classList = "checkBoxSpan"
                        

                        let hr = htmlFactory.createElementWithText("hr")
                        checkBoxSpan.appendChild(checkBox)
                        innerDiv.appendChild(taskListItem)
                        innerDiv.appendChild(dateSpan)
                        // innerDiv.appendChild(checkBox)
                        innerDiv.appendChild(checkBoxSpan)
                        taskList.appendChild(innerDiv)
                        taskList.appendChild(hr)

                        //event listeners on task name and task date and checkbox
                        taskListItem.addEventListener("click", () => {
                            taskHandler.handleEditTask(event)
                        })

                        dateSpan.addEventListener("click", () => {
                            taskHandler.handleEditTask(event)
                        })

                        checkBoxSpan.addEventListener("click", () => {
                            taskHandler.handleCheckBox()
                        })

                        checkBox.addEventListener("click", () => {
                            taskHandler.handleCheckBox()
                        })

                    }
                })
            })
        loopDiv.appendChild(taskList)
        headerDiv.appendChild(taskHeader)
        mainDiv.appendChild(headerDiv)
        mainDiv.appendChild(loopDiv)
        // buttonDiv.appendChild(refreshButton)
        buttonDiv.appendChild(newTaskButton)
        loopDiv.appendChild(buttonDiv)
        taskFragment.appendChild(mainDiv)

        //event listener to add a new task
        newTaskButton.addEventListener("click", () => {
            taskHandler.handleNewTask()
        })

        // refreshButton.addEventListener("click", () => {
        //     console.log("refresh works")
        // })

        return taskFragment

    }
}