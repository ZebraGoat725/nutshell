//Author Alex Thacker

//page to create form for entering new tasks
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer

import taskHandler from "./taskHandler"
//handleNewTask
//handleSaveTask

export default {
    newTaskForm () {
        let formFragment = document.createDocumentFragment()

        let saveTaskButton = htmlFactory.createElementWithText("button", "Save New Task")
        saveTaskButton.classList = "btn btn-primary"
        let newTaskSpan = htmlFactory.createElementWithText("span", "", "newTaskSpan")

        let taskLabel = htmlFactory.createElementWithText("label", "New Task: ")
        let taskInput = htmlFactory.createElementWithText("input", "", "taskInput")

        let dateLabel = htmlFactory.createElementWithText("label", "Target Date: ")
        let dateInput = htmlFactory.createElementWithText("input","", "dateInput")
        dateInput.type = "date"

        newTaskSpan.appendChild(saveTaskButton)
        newTaskSpan.appendChild(taskLabel)
        newTaskSpan.appendChild(taskInput)
        newTaskSpan.appendChild(dateLabel)
        newTaskSpan.appendChild(dateInput)
        formFragment.appendChild(newTaskSpan)

        saveTaskButton.addEventListener("click", () => {
            taskHandler.handleSaveTask()
        })

        return formFragment
    }
}