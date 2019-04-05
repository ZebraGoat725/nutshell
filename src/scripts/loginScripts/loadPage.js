import friendEventHandler from "./../friendScripts/friendEventHandler"

const loadPage = {
    load() {
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
    }
}

export default loadPage