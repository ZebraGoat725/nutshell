import buildFriendsSection from "./buildFriendsSection"
import API from "./../apiManager"

const friendsContainer = document.querySelector("#friends-section");

const appendFriendsSection = {
    // Function to get all user and friend information and then append that to the DOM
    appendSection() {
        let userID = sessionStorage.getItem("userID");
        return API.getResource("users", userID).then(user => {
                friendsContainer.appendChild(buildFriendsSection.createTopDiv(user.userName, user.email, user.image))
            })
            .then(API.getFriends(userID).then(friends => {
                friends.forEach(friend => {
                    friendsContainer.appendChild(buildFriendsSection.createFriendDiv(friend.user.userName, friend.user.email, friend.user.image, friend.id))
                })
            }))
    }
};

export default appendFriendsSection