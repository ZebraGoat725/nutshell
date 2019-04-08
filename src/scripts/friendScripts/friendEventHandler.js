import appendFriendsSection from "./appendFriendsSection"
import HTMLFactory from "./../HTMLFactory"
import apiFriends from "./apiManagerFriends"
import API from "../apiManager"
import buildFriendsSection from "./buildFriendsSection"

const friendsContainer = document.querySelector("#friends-section");

const friendEventHandler = {
    // Function to append friend section to DOM to be later combined with other functions to populate DOM on login
    handleAppendFriend() {
        HTMLFactory.clearContainer(friendsContainer);
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
        let saveFriendContainer = document.querySelector("#save-friend-div");
        HTMLFactory.clearContainer(saveFriendContainer)
        let saveFriendFooterDiv = HTMLFactory.createElementWithText("div");
        saveFriendFooterDiv.classList = "card-footer";
        let addFriendInput = HTMLFactory.createElementWithText("input", "YES", "add-friend-input")
        addFriendInput.placeholder = "Who would you like to friend?";
        saveFriendFooterDiv.appendChild(addFriendInput);
        let saveFriendButton = HTMLFactory.createElementWithText("button", "Add friend");
        saveFriendButton.classList = "btn btn-primary";
        saveFriendButton.addEventListener("click", friendEventHandler.saveFriend)
        saveFriendFooterDiv.appendChild(saveFriendButton);
        saveFriendContainer.appendChild(saveFriendFooterDiv);
        return saveFriendContainer;
    },
    // Function to POST new friend connection to friends resource
    saveFriend() {
        let userID = sessionStorage.getItem("userID");
        let friendToSave = document.getElementById("add-friend-input").value;
        let currentUserName = document.getElementById("current-user-name").textContent;
        let userNames = [];
        let friendNames = [];

        return API.getResources("users")
            .then(users => {
                users.forEach(user => {
                    return userNames.push(user)
                })
            })
            .then(() => {
                return apiFriends.getFriends(userID)
                    .then(friends => {
                        friends.forEach(friend => {
                            return friendNames.push(friend.user.userName.toLowerCase())
                        })
                    })
            })
            .then(() => {
                let foundUser = userNames.find(friend => {
                    return friend.userName.toLowerCase() === friendToSave.toLowerCase()
                });
                let foundFriend = friendNames.find(friend => {
                    return friend === friendToSave.toLowerCase()
                });
                if (foundUser === undefined) {
                    alert(`${friendToSave} does not have an account`)
                } else if (foundFriend === friendToSave.toLowerCase()) {
                    alert(`You are already friends with ${friendToSave}`)
                } else if (currentUserName.toLowerCase() === friendToSave.toLowerCase()) {
                    alert("That is just sad")
                } else {
                    let friendObj = buildFriendsSection.createFriendObject(Number(userID), foundUser.id)
                    apiFriends.postFriend(friendObj)
                        .then(friendEventHandler.handleAppendFriend())
                }
            })
    }
};

export default friendEventHandler