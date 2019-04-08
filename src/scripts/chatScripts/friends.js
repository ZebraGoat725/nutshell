// this component will call the getFriends fetch call and then parse it so that it will grab all the friends if and check for friend's id


const parsed = {
    friendsIdArray: [],
    getFriendId: (parsedFriendsArray) => { //this function will parse through the friends and push them into
        // an array that will be pushed to another function
        parsedFriendsArray.forEach(friendObj => {
            parsed.friendsIdArray.push(friendObj.user.id)
        });
    },
    returnFriendsArray: () => {
        return parsed.friendsIdArray
    }
}

export default parsed