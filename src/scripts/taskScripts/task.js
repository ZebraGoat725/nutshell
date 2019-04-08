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
        let taskHeader = htmlFactory.createElementWithText("h1", "Your Tasks")
        let taskList = htmlFactory.createElementWithText("ul", "", "taskList")
        let loopDiv = htmlFactory.createElementWithText("div", "", "loopDiv")
        let buttonDiv = htmlFactory.createElementWithText("div", "", "buttonDiv")
        let newTaskButton = htmlFactory.createElementWithText("button", "New Task")
        // let refreshButton = htmlFactory.createElementWithText("button", "Refresh")

        taskApiManager.getTask(data)
            .then(task => {
                task.forEach(entry => {
                    //build elements and add content inside them from get call. loops depending how many entries json file has
                    if (entry.isComplete === false) {
                        let innerDiv = htmlFactory.createElementWithText("div", "", `innerDiv--${entry.id}`)
                        let taskListItem = htmlFactory.createElementWithText("li", `${entry.taskName}`)
                        let dateSpan = htmlFactory.createElementWithText("p", entry.targetDate, `taskDate--${entry.id}`)
                        let checkBoxSpan = htmlFactory.createElementWithText("p", "Done")
                        let checkBox = htmlFactory.createElementWithText("input", "", `checkBox--${entry.id}`)
                        checkBox.type = "checkbox"
                        checkBox.value = entry.isComplete


                        let hr = htmlFactory.createElementWithText("hr")

                        innerDiv.appendChild(taskListItem)
                        innerDiv.appendChild(dateSpan)
                        innerDiv.appendChild(checkBoxSpan)
                        innerDiv.appendChild(checkBox)
                        innerDiv.appendChild(hr)
                        taskList.appendChild(innerDiv)

                        //event listeners on task name and task date and checkbox
                        taskListItem.addEventListener("click", () => {
                            taskHandler.handleEditTask(event)
                        })

                        dateSpan.addEventListener("click", () => {
                            taskHandler.handleEditTask(event)
                        })

                        checkBox.addEventListener("click", () => {
                            taskHandler.handleCheckBox()
                        })

                    }
                })
            })
        loopDiv.appendChild(taskList)
        mainDiv.appendChild(taskHeader)
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

// task, target Date, checkbox, header, create new button, refresh button

// "id": 1,
// "userId": 2,
// "taskName": "Take out trash",
// "targetDate": "4/5/2019",
// "isComplete": false

{
    /* <div>
        <h1>tasks</h1>
        <div>
            <p>first task</p>
            <p>date</p>
            <p>checkbox</p>
            <div>
                <button>refresh</button>
                <button>create new</button>
            </div>
        </div>
    </div> */
}