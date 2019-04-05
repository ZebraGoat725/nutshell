import friendEventHandler from "./../friendScripts/friendEventHandler"
import task from "../taskScripts/task"

const loadPage = {
    load() {
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
        let taskContainer = document.querySelector("#tasks-section")
        taskContainer.appendChild(task.createTask())
    }
}

export default loadPage