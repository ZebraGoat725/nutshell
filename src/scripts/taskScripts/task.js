//function to create elements and do get call to populate elements
import apiManager from "../apiManager"
//getTask
import htmlFactory from "../HTMLFactory"
//createElementWithText
//clearContainer

let data = sessionStorage.getItem("userID")
// console.log(data)

export default {
    createTask() {
        let taskFragment = document.createDocumentFragment()

        let mainDiv = htmlFactory.createElementWithText("div")

        let taskHeader = htmlFactory.createElementWithText("h1", "Your Tasks")

        let taskList = htmlFactory.createElementWithText("ul")

        let loopDiv = htmlFactory.createElementWithText("div")

        apiManager.getTask(data)
            .then(task => {
                task.forEach(entry => {
                    let taskListItem = htmlFactory.createElementWithText("li", entry.taskName)
                    let checkBox = htmlFactory.createElementWithText("input")
                    let dateSpan = htmlFactory.createElementWithText("span", entry.targetDate)
                    let checkBoxSpan = htmlFactory.createElementWithText("span", "Done")
                    checkBox.type = "checkbox"

                    let hr = htmlFactory.createElementWithText("hr")
                    
                    taskList.appendChild(taskListItem)
                    taskList.appendChild(dateSpan)
                    taskList.appendChild(checkBoxSpan)
                    taskList.appendChild(checkBox)
                    taskList.appendChild(hr)

                    taskListItem.addEventListener("click", () => {
                        console.log("work")
                    })
                    
                })
            })
        loopDiv.appendChild(taskList)
        mainDiv.appendChild(taskHeader)
        mainDiv.appendChild(loopDiv)
        taskFragment.appendChild(mainDiv)
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