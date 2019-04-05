//function to create elements and do get call to populate elements
import apiManager from "../apiManager"
//getTask
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer

import taskHandler from "./taskHandler"
//handleNewTask

let data = sessionStorage.getItem("userID")
// console.log(data)

export default {
    createTask() {
        let taskFragment = document.createDocumentFragment()

        let mainDiv = htmlFactory.createElementWithText("div")

        let taskHeader = htmlFactory.createElementWithText("h1", "Your Tasks")

        let taskList = htmlFactory.createElementWithText("ul","", "taskList")
//////////
        let loopDiv = htmlFactory.createElementWithText("div","", "loopDiv")

        let buttonDiv = htmlFactory.createElementWithText("div", "", "buttonDiv")

        let newTaskButton = htmlFactory.createElementWithText("button", "New Task")

        let refreshButton = htmlFactory.createElementWithText("button", "Refresh")

        apiManager.getTask(data)
            .then(task => {
                task.forEach(entry => {
                    if (entry.isComplete === false){
                    let innerDiv = htmlFactory.createElementWithText("div", "", `innerDiv--${entry.id}`)
                    let taskListItem = htmlFactory.createElementWithText("li", `${entry.taskName}---- Target Date: ${entry.targetDate}`)
                    // let dateSpan = htmlFactory.createElementWithText("span", entry.targetDate)
                    let checkBoxSpan = htmlFactory.createElementWithText("span", "Done")
                    let checkBox = htmlFactory.createElementWithText("input", "", `checkBox--${entry.id}`)
                    checkBox.type = "checkbox"
                    checkBox.value = entry.isComplete

                    let hr = htmlFactory.createElementWithText("hr")
                    
                    innerDiv.appendChild(taskListItem)
                    // innerDiv.appendChild(dateSpan)
                    innerDiv.appendChild(checkBoxSpan)
                    innerDiv.appendChild(checkBox)
                    innerDiv.appendChild(hr)
                    taskList.appendChild(innerDiv)

                    taskListItem.addEventListener("click", () => {
                        taskHandler.handleEditTask(event)
                    })

                    // dateSpan.addEventListener("click", () => {
                    //     taskHandler.handleEditTask(event)
                    // })
                    
                }
                })
            })
        loopDiv.appendChild(taskList)
        mainDiv.appendChild(taskHeader)
        mainDiv.appendChild(loopDiv)
        buttonDiv.appendChild(refreshButton)
        buttonDiv.appendChild(newTaskButton)
        loopDiv.appendChild(buttonDiv)
        taskFragment.appendChild(mainDiv)

        newTaskButton.addEventListener("click", () => {
            taskHandler.handleNewTask()
        })

        refreshButton.addEventListener("click", () => {
            console.log("refresh works")
        })

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