import HTMLFactory from "./../HTMLFactory"
import friendEventHandler from "./friendEventHandler"

const buildFriendsSection = {
    // Function to create div container for user information
    createTopDiv(userName, userEmail, userImage) {
        const divSideBar = HTMLFactory.createElementWithText("div");
        divSideBar.classList = "card"
        let headerText = HTMLFactory.createElementWithText("h1", "Friends")
        headerText.classList = "card-header";
        divSideBar.appendChild(headerText);
        let bodyDiv = HTMLFactory.createElementWithText("div");
        bodyDiv.classList = "card-body";
        let userPic = HTMLFactory.createElementWithText("IMG");
        userPic.setAttribute("src", userImage)
        bodyDiv.appendChild(userPic);
        bodyDiv.appendChild(HTMLFactory.createElementWithText("h3", userName, "current-user-name"));
        bodyDiv.appendChild(HTMLFactory.createElementWithText("h3", userEmail));
        divSideBar.appendChild(bodyDiv)
        return divSideBar;
    },
    // Function to create individual div containers for each friend
    createFriendDiv(friendName, friendEmail, friendImage, friendId) {
        const friendDiv = HTMLFactory.createElementWithText("div");
        friendDiv.classList = "card";
        let bodyDiv = HTMLFactory.createElementWithText("div");
        bodyDiv.classList = "card-body"
        let userPic = HTMLFactory.createElementWithText("IMG");
        userPic.setAttribute("src", friendImage)
        bodyDiv.appendChild(userPic);
        bodyDiv.appendChild(HTMLFactory.createElementWithText("h4", friendName));
        bodyDiv.appendChild(HTMLFactory.createElementWithText("h4", friendEmail));
        let deleteButton = HTMLFactory.createElementWithText("button", "Delete Friend", `delete-friend--${friendId}`);
        deleteButton.classList = "btn btn-sm btn-danger";
        deleteButton.addEventListener("click", friendEventHandler.deleteFriend)
        bodyDiv.appendChild(deleteButton);
        friendDiv.appendChild(bodyDiv);
        return friendDiv;
    },
    // Function to create div container with input to save new friend
    createSaveFriendDiv() {
        const saveFriendDiv = HTMLFactory.createElementWithText("div", undefined, "save-friend-div");
        saveFriendDiv.classList = "card";
        const saveFriendFooterDiv = HTMLFactory.createElementWithText("div");
        saveFriendFooterDiv.classList = "card-footer";
        let addFriendButton = HTMLFactory.createElementWithText("button", "Add a friend");
        addFriendButton.classList = "btn btn-primary";
        addFriendButton.addEventListener("click", friendEventHandler.addFriend)
        saveFriendFooterDiv.appendChild(addFriendButton);
        saveFriendDiv.appendChild(saveFriendFooterDiv);
        return saveFriendDiv;
    },
    // Factory function to create a friend object to be posted to friends resource
    createFriendObject(currentUserId, friendID) {
        let friendObj = {
            "currentUserId": currentUserId,
            "userId": friendID
        };
        return friendObj;
    }
};

export default buildFriendsSection;