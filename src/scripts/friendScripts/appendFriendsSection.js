// Author: Billy Mathison
// Page contains an object with function to append user and friend information to the DOM

import buildFriendsSection from "./buildFriendsSection"
import API from "./../apiManager"
import apiFriends from "./apiManagerFriends"

const friendsContainer = document.querySelector("#friends-section");

const appendFriendsSection = {
    // Function to get all user and friend information and then append that to the DOM
    appendSection() {
        let userID = sessionStorage.getItem("userID");
        const sideNav = document.createElement("nav");
        sideNav.classList = "sidenav";
        friendsContainer.appendChild(sideNav);
        return API.getResource("users", userID)
            .then(user => {
                return sideNav.appendChild(buildFriendsSection.createTopDiv(user.userName, user.email, user.image))
            })
            .then(() => {
                return apiFriends.getFriends(userID)
                    .then(friends => {
                        friends.forEach(friend => {
                            return sideNav.appendChild(buildFriendsSection.createFriendDiv(friend.user.userName, friend.user.email, friend.user.image, friend.id))
                        })
                    })
            })
            .then(() => {
                sideNav.appendChild(buildFriendsSection.createSaveFriendDiv())
            })
    }
};

export default appendFriendsSection