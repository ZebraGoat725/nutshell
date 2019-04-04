import appendFriendsSection from "./appendFriendsSection"
import API from "../apiManager";
import HTMLFactory from "./../HTMLFactory"

const friendsContainer = document.querySelector("#friends-section");

const friendEventHandler = {
    // Function to append friend section to DOM to be later combined with other functions to populate DOM on login
    handleAppendFriend() {
        appendFriendsSection.appendSection();
    },
    // Function to delete friend connection from API and append updated list of friends to DOM
    deleteFriend() {
        let friendID = event.target.id.split("--");
        return API.deleteFriend(friendID[1])
            .then(() => {
                HTMLFactory.clearContainer(friendsContainer);
            }).then(() => {
                friendEventHandler.handleAppendFriend();
            })
    }
};

export default friendEventHandler