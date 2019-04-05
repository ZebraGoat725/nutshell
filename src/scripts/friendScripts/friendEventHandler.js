import appendFriendsSection from "./appendFriendsSection"
import HTMLFactory from "./../HTMLFactory"
import apiFriends from "./apiManagerFriends"
import API from "../apiManager";

const friendsContainer = document.querySelector("#friends-section");

const friendEventHandler = {
    // Function to append friend section to DOM to be later combined with other functions to populate DOM on login
    handleAppendFriend() {
        appendFriendsSection.appendSection();
    },
    // Function to delete friend connection from API and append updated list of friends to DOM
    deleteFriend() {
        let friendID = event.target.id.split("--");
        return apiFriends.deleteFriend(friendID[1])
            .then(() => {
                HTMLFactory.clearContainer(friendsContainer);
            }).then(() => {
                friendEventHandler.handleAppendFriend();
            })
    },
    // Function to add input field for user to add new friend
    addFriend() {
        HTMLFactory.clearContainer(event.target.parentNode)
        let addFriendInput = HTMLFactory.createElementWithText("input", "YES", "add-friend-input")
        addFriendInput.placeholder = "Who would you like to friend?";
        friendsContainer.appendChild(addFriendInput);
        let saveFriendButton = HTMLFactory.createElementWithText("button", "Add friend");
        saveFriendButton.addEventListener("click", friendEventHandler.saveFriend);
        friendsContainer.appendChild(saveFriendButton);
    },
    // Function to POST new friend connection to friends
    saveFriend() {
        let friendToSave = document.getElementById("add-friend-input").value;
        let userNames = [];
        console.log(friendToSave)
        return API.getResources("users")
            .then(users => {
                return users.forEach(user => {
                    console.log(user.userName.toLowerCase())
                    userNames.push(user.userName.toLowerCase())
                })
            })
            .then(() => {
                let foundUser = userNames.find(friend => {
                    return friend === friendToSave.toLowerCase()
                });
                if (foundUser === undefined) {
                    alert(`${friendToSave} does not have an account`)
                }
            })
    }
};

export default friendEventHandler