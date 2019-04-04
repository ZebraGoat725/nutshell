import buildFriendsSection from "./buildFriendsSection"
import API from "./../apiManager"

const friendsContainer = document.querySelector("#friends-section");

const appendFriendsSection = {
    appendSection() {
        let userID = sessionStorage.getItem("userID");
        API.getResource("users", userID).then(user => {
            console.log("building top div")
            friendsContainer.appendChild(buildFriendsSection.createTopDiv(user.userName, user.email))
        })
    }
};

export default appendFriendsSection