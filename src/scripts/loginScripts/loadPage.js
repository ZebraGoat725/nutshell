import friendEventHandler from "./../friendScripts/friendEventHandler"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML"
import buildNavbar from "./../buildNavbar"


const loadPage = {
    load() {
        
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()

        // Calling function to build navbar
        buildNavbar.buildList();

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