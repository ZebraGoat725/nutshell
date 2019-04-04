import HTMLFactory from "./../HTMLFactory"

const buildFriendsSection = {
    createTopDiv(userName, userEmail, userImage) {
        const divSideBar = HTMLFactory.createElementWithText("div");
        divSideBar.classList = "sidenav";
        divSideBar.appendChild(HTMLFactory.createElementWithText("h1", "Friends"));
        divSideBar.appendChild(HTMLFactory.createElementWithText("div"));
        divSideBar.appendChild(HTMLFactory.createElementWithText("IMG", userImage));
        divSideBar.appendChild(HTMLFactory.createElementWithText("h3", userName));
        divSideBar.appendChild(HTMLFactory.createElementWithText("h3", userEmail));
        divSideBar.appendChild(HTMLFactory.createElementWithText("hr"));
        return divSideBar;
    },
    createFriendDiv(friendName, friendEmail, friendImage) {
        const friendDiv = HTMLFactory.createElementWithText("div");
        friendDiv.appendChild(HTMLFactory.createElementWithText("IMG", friendImage));
        friendDiv.appendChild(HTMLFactory.createElementWithText("h4", friendName));
        friendDiv.appendChild(HTMLFactory.createElementWithText("h4", friendEmail));
        friendDiv.appendChild(HTMLFactory.createElementWithText("hr"));
        return friendDiv;
    }
};

export default buildFriendsSection;