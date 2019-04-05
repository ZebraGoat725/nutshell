import friendEventHandler from "./../friendScripts/friendEventHandler"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML";

let userID = sessionStorage.getItem("userID");

const loadPage = {
    load() {
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
        eventsData.getEvents(userID).then(response => eventHTML.listEventsToDom(response)).then(() => eventsData.getFriendEvents(userID)).then(response => eventHTML.listEventsToDom(response));
    }
}

export default loadPage