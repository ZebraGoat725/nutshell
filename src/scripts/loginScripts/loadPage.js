import friendEventHandler from "./../friendScripts/friendEventHandler"
import task from "../taskScripts/task"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML";



const loadPage = {
    load() {
        
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
        let taskContainer = document.querySelector("#tasks-section")
        taskContainer.appendChild(task.createTask())
        let userID = sessionStorage.getItem("userID");
        return eventsData.getEvents(userID).then(response => {
            return eventHTML.listEventsToDom(response)
        }).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        }))
    }
}

export default loadPage