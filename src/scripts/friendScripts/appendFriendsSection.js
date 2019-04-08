import buildFriendsSection from "./buildFriendsSection"
import API from "./../apiManager"
import apiFriends from "./apiManagerFriends"

const friendsContainer = document.querySelector("#friends-section");

const appendFriendsSection = {
    // Function to get all user and friend information and then append that to the DOM
    appendSection() {
        let userID = sessionStorage.getItem("userID");
        return API.getResource("users", userID)
            .then(user => {
                return friendsContainer.appendChild(buildFriendsSection.createTopDiv(user.userName, user.email, user.image))
            })
            .then(() => {
                return apiFriends.getFriends(userID)
                    .then(friends => {
                        friends.forEach(friend => {
                            return friendsContainer.appendChild(buildFriendsSection.createFriendDiv(friend.user.userName, friend.user.email, friend.user.image, friend.id))
                        })
                    })
            })
            .then(() => {
                friendsContainer.appendChild(buildFriendsSection.createSaveFriendDiv())
            })
    }
};

export default appendFriendsSection