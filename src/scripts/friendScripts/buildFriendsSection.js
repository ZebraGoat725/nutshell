import HTMLFactory from "./../HTMLFactory"
import friendEventHandler from "./friendEventHandler"

const buildFriendsSection = {
    createTopDiv(userName, userEmail, userImage) {
        const divSideBar = HTMLFactory.createElementWithText("div");
        divSideBar.classList = "sidenav";
        divSideBar.appendChild(HTMLFactory.createElementWithText("h1", "Friends"));
        divSideBar.appendChild(HTMLFactory.createElementWithText("div"));
        let userPic = HTMLFactory.createElementWithText("IMG");
        userPic.setAttribute("src", userImage)
        divSideBar.appendChild(userPic);
        divSideBar.appendChild(HTMLFactory.createElementWithText("h3", userName));
        divSideBar.appendChild(HTMLFactory.createElementWithText("h3", userEmail));
        divSideBar.appendChild(HTMLFactory.createElementWithText("hr"));
        return divSideBar;
    },
    createFriendDiv(friendName, friendEmail, friendImage, friendId) {
        const friendDiv = HTMLFactory.createElementWithText("div");
        let userPic = HTMLFactory.createElementWithText("IMG");
        userPic.setAttribute("src", friendImage)
        friendDiv.appendChild(userPic);
        friendDiv.appendChild(HTMLFactory.createElementWithText("h4", friendName));
        friendDiv.appendChild(HTMLFactory.createElementWithText("h4", friendEmail));
        let deleteButton = HTMLFactory.createElementWithText("button", "Delete Friend", `delete-friend--${friendId}`);
        deleteButton.addEventListener("click", friendEventHandler.deleteFriend)
        friendDiv.appendChild(deleteButton);
        friendDiv.appendChild(HTMLFactory.createElementWithText("hr"));
        return friendDiv;
    }
};

export default buildFriendsSection;