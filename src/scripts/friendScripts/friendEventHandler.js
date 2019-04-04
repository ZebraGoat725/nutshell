import appendFriendsSection from "./appendFriendsSection"
import API from "../apiManager";
import HTMLFactory from "./../HTMLFactory"

const friendsContainer = document.querySelector("#friends-section");

const friendEventHandler = {
    handleAppendFriend() {
        appendFriendsSection.appendSection();
    },
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